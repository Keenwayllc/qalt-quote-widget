import "server-only";
import prisma from "@/lib/prisma";
import { estimatePriceDetailed, type EstimateExtras, type EstimateRules, type PriceLineItem } from "@/lib/calculator";
import { calculateMultiStopDrivingDistance } from "@/lib/google-maps";
import { routeLocations, type IntermediateStop } from "@/lib/route-stops";
import { applyPricingRules, listPricingRules } from "@/lib/growth-engine";

import { normalizeCustomQuestions, validateCustomAnswers, customAnswerCharges } from "@/lib/form-questions";

export type QuoteBreakdown = { total:number; lineItems:PriceLineItem[]; distanceMiles:number; freeMiles:number; billableMiles:number; minimumApplied:boolean };
export type ServiceComparison = { name:string; description?:string; deliveryWindow?:string; total:number; breakdown:QuoteBreakdown };
export type AuthoritativeQuote = { total:number; distance:number; durationMinutes:number|null; breakdown:QuoteBreakdown; serviceType:string; deliveryWindow?:string; vehicleType:string|null; serviceComparisons?:ServiceComparison[] };
export type QuoteComputationResult = { ok:true; quote:AuthoritativeQuote } | { ok:false; status:number; error:string };
type ServiceOption = { name:string; description?:string; deliveryWindow?:string; fee:number };
type PricingRulesWithServices = EstimateRules & { serviceOptions?:unknown };
type VehicleOption = { name:string; fee:number };
type ComputeInput = { companyId:string; formId?:string|null; startLocation:string; endLocation:string; intermediateStops?:IntermediateStop[]; extras:EstimateExtras; vehicleCount?:number; vehicleType?:string|null; clientDistanceFallback?:number|null; serviceType?:string|null; compareServices?:boolean; customAnswers?:unknown };

function parseServiceOptions(value:unknown):ServiceOption[]{
  if(!Array.isArray(value))return[];
  return value.slice(0,30).flatMap((raw)=>{
    if(!raw||typeof raw!=="object")return[];
    const item=raw as Record<string,unknown>;
    const name=String(item.name??"").trim();
    const fee=Number(item.fee);
    if(!name||!Number.isFinite(fee)||fee<0)return[];
    return[{name,description:String(item.description??"").trim(),deliveryWindow:String(item.deliveryWindow??"").trim().slice(0,120),fee}];
  });
}

export async function computeAuthoritativeQuote(input:ComputeInput):Promise<QuoteComputationResult>{
  const {companyId,formId,startLocation,endLocation,intermediateStops=[],extras,vehicleCount,vehicleType,clientDistanceFallback,serviceType,compareServices,customAnswers}=input;
  if(!startLocation||!endLocation)return{ok:false,status:400,error:"Missing location data"};
  let ownedWidgetSettings:{id:string;showVehicles:boolean;pricePerVehicle:number;vehicleOptions:unknown;formStyle?:string;customQuestions?:unknown}|null=null;
  if(formId){const form=await prisma.widgetSettings.findUnique({where:{id:formId},select:{id:true,companyId:true,showVehicles:true,pricePerVehicle:true,vehicleOptions:true,formStyle:true,customQuestions:true}});if(!form||form.companyId!==companyId)return{ok:false,status:404,error:"Form not found"};ownedWidgetSettings={id:form.id,showVehicles:form.showVehicles,pricePerVehicle:form.pricePerVehicle,vehicleOptions:form.vehicleOptions,formStyle:form.formStyle,customQuestions:form.customQuestions};}
  if (!formId) {
    const form = await prisma.widgetSettings.findFirst({ where:{companyId}, orderBy:{id:"asc"}, select:{id:true,showVehicles:true,pricePerVehicle:true,vehicleOptions:true,formStyle:true,customQuestions:true} });
    if (!form) return { ok:false, status:404, error:"Form not found" };
    ownedWidgetSettings = form;
  }
  const pricingFormId = ownedWidgetSettings?.id;
  let pricingProfile:PricingRulesWithServices|null=null;
  if(pricingFormId){const fp=await prisma.pricingProfile.findFirst({where:{widgetSettingsId:pricingFormId,companyId}});if(fp)pricingProfile=fp as unknown as PricingRulesWithServices;}
  if(!pricingProfile){const dp=await prisma.pricingProfile.findFirst({where:{companyId,widgetSettingsId:null}});if(dp)pricingProfile=dp as unknown as PricingRulesWithServices;}
  if(!pricingProfile)return{ok:false,status:404,error:"Pricing not configured"};

  const services=parseServiceOptions(pricingProfile.serviceOptions);
  let resolvedService="Standard Delivery";
  let selectedService:ServiceOption|null=null;
  if(services.length>0){
    const requested=String(serviceType??"").trim();
    if(!requested&&!compareServices)return{ok:false,status:400,error:"Please select a delivery service."};
    selectedService=requested ? services.find((option)=>option.name.toLocaleLowerCase()===requested.toLocaleLowerCase())??null : services[0];
    if(!selectedService)return{ok:false,status:400,error:"That delivery service is not available."};
    resolvedService=selectedService.name;
  }

  const questions = ownedWidgetSettings?.formStyle === "extended" ? normalizeCustomQuestions(ownedWidgetSettings.customQuestions) : [];
  // Price-changing answers are required on estimate as well as submit. Legacy informational
  // questions stay validated at submission so existing API clients remain compatible.
  const pricedQuestions = questions.some((question) => Object.values(question.optionFees ?? {}).some((fee) => fee > 0));
  const checked = validateCustomAnswers(questions, customAnswers);
  if (checked.error && (pricedQuestions || customAnswers !== undefined)) return { ok:false, status:422, error:checked.error };
  const charges = customAnswerCharges(questions, checked.answers);

  const distanceResult=await calculateMultiStopDrivingDistance(routeLocations(startLocation,intermediateStops,endLocation));let distance:number;let durationMinutes:number|null=null;
  if(distanceResult!==null){distance=distanceResult.distanceMiles;durationMinutes=distanceResult.durationMinutes;}else if(typeof clientDistanceFallback==="number"&&clientDistanceFallback>0){distance=clientDistanceFallback;}else{return{ok:false,status:400,error:"Could not calculate distance. Please check your addresses."};}
  const detailed=estimatePriceDetailed(distance,pricingProfile,{...extras,additionalStopCount:intermediateStops.length});let total=detailed.total;const lineItems:PriceLineItem[]=[...detailed.lineItems];

  total += charges.reduce((sum, charge) => sum + charge.amount, 0);
  lineItems.push(...charges);

  let resolvedVehicleType:string|null=null;
  if(vehicleCount&&vehicleCount>0){
    let widgetSettings=ownedWidgetSettings;
    if(!widgetSettings){
      const fallback=await prisma.widgetSettings.findFirst({where:{companyId},orderBy:{id:"asc"},select:{id:true,showVehicles:true,pricePerVehicle:true,vehicleOptions:true,formStyle:true,customQuestions:true}});
      if(fallback)widgetSettings=fallback;
    }
    if(widgetSettings?.showVehicles){
      const vehicleOptions:VehicleOption[]=Array.isArray(widgetSettings.vehicleOptions)
        ? widgetSettings.vehicleOptions.flatMap((raw)=>{
            if(!raw||typeof raw!=="object")return[];
            const item=raw as Record<string,unknown>;
            const name=String(item.name??"").trim();
            const fee=Number(item.fee);
            if(!name||!Number.isFinite(fee)||fee<0)return[];
            return[{name,fee}];
          })
        :[];
      let vehicleRate=widgetSettings.pricePerVehicle;
      if(vehicleOptions.length>0){
        const requested=String(vehicleType??"").trim();
        if(!requested&&!compareServices)return{ok:false,status:400,error:"Please select a vehicle type."};
        const selected=vehicleOptions.find((option)=>option.name.toLocaleLowerCase()===requested.toLocaleLowerCase());
        if(!selected)return{ok:false,status:400,error:"That vehicle type is not available."};
        resolvedVehicleType=selected.name;
        if(selected.fee>0)vehicleRate=selected.fee;
      }
      if(vehicleRate>0){
        const vehicleAmount=vehicleRate*vehicleCount;
        total+=vehicleAmount;
        lineItems.push({
          key:"vehicles",
          label:resolvedVehicleType ? `${resolvedVehicleType}, ${vehicleCount}` : `Vehicles, ${vehicleCount}`,
          amount:vehicleAmount,
          detail:`${vehicleCount} × ${vehicleRate.toFixed(2)}`,
        });
      }
    }
  }
  const rules = compareServices && services.length > 1 ? await listPricingRules(companyId) : undefined;
  const priceService = async (service: ServiceOption | null) => {
    const serviceItems = service && service.fee > 0 ? [{ key:`service:${service.name}`, label:service.name, amount:service.fee, detail:service.deliveryWindow || service.description || "Service charge" }] : [];
    const adjusted = await applyPricingRules(companyId, distance, extras, total + (service?.fee ?? 0), rules);
    const breakdown: QuoteBreakdown = { total:adjusted.total, lineItems:[...lineItems,...serviceItems,...adjusted.lineItems], distanceMiles:detailed.distanceMiles, freeMiles:detailed.freeMiles, billableMiles:detailed.billableMiles, minimumApplied:detailed.minimumApplied };
    return { name:service?.name ?? resolvedService, description:service?.description, deliveryWindow:service?.deliveryWindow, total:adjusted.total, breakdown };
  };
  const comparisons = compareServices && services.length > 1 ? await Promise.all(services.map(priceService)) : undefined;
  const selected = comparisons?.find((option) => option.name === resolvedService) ?? await priceService(selectedService);
  return { ok:true, quote:{ total:selected.total, distance, durationMinutes, serviceType:resolvedService, deliveryWindow:selected.deliveryWindow, vehicleType:resolvedVehicleType, breakdown:selected.breakdown, ...(comparisons ? { serviceComparisons:comparisons } : {}) } };
}
