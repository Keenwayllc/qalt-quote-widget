import "server-only";
import prisma from "@/lib/prisma";
import { estimatePriceDetailed, type EstimateExtras, type EstimateRules, type PriceLineItem } from "@/lib/calculator";
import { calculateDrivingDistance } from "@/lib/google-maps";
import { applyPricingRules } from "@/lib/growth-engine";

export type QuoteBreakdown = { total:number; lineItems:PriceLineItem[]; distanceMiles:number; freeMiles:number; billableMiles:number; minimumApplied:boolean };
export type AuthoritativeQuote = { total:number; distance:number; durationMinutes:number|null; breakdown:QuoteBreakdown; serviceType:string };
export type QuoteComputationResult = { ok:true; quote:AuthoritativeQuote } | { ok:false; status:number; error:string };
type ServiceOption = { name:string; description?:string; fee:number };
type PricingRulesWithServices = EstimateRules & { serviceOptions?:unknown };
type ComputeInput = { companyId:string; formId?:string|null; startLocation:string; endLocation:string; extras:EstimateExtras; vehicleCount?:number; clientDistanceFallback?:number|null; serviceType?:string|null };

function parseServiceOptions(value:unknown):ServiceOption[]{
  if(!Array.isArray(value))return[];
  return value.flatMap((raw)=>{
    if(!raw||typeof raw!=="object")return[];
    const item=raw as Record<string,unknown>;
    const name=String(item.name??"").trim();
    const fee=Number(item.fee);
    if(!name||!Number.isFinite(fee)||fee<0)return[];
    return[{name,description:String(item.description??"").trim(),fee}];
  });
}

export async function computeAuthoritativeQuote(input:ComputeInput):Promise<QuoteComputationResult>{
  const {companyId,formId,startLocation,endLocation,extras,vehicleCount,clientDistanceFallback,serviceType}=input;
  if(!startLocation||!endLocation)return{ok:false,status:400,error:"Missing location data"};
  let ownedWidgetSettings:{id:string;showVehicles:boolean;pricePerVehicle:number}|null=null;
  if(formId){const form=await prisma.widgetSettings.findUnique({where:{id:formId},select:{id:true,companyId:true,showVehicles:true,pricePerVehicle:true}});if(!form||form.companyId!==companyId)return{ok:false,status:404,error:"Form not found"};ownedWidgetSettings={id:form.id,showVehicles:form.showVehicles,pricePerVehicle:form.pricePerVehicle};}
  let pricingProfile:PricingRulesWithServices|null=null;
  if(formId){const fp=await prisma.pricingProfile.findUnique({where:{widgetSettingsId:formId}});if(fp)pricingProfile=fp as unknown as PricingRulesWithServices;}
  if(!pricingProfile){const dp=await prisma.pricingProfile.findFirst({where:{companyId,widgetSettingsId:null}});if(dp)pricingProfile=dp as unknown as PricingRulesWithServices;}
  if(!pricingProfile)return{ok:false,status:404,error:"Pricing not configured"};

  const services=parseServiceOptions(pricingProfile.serviceOptions);
  let resolvedService="Standard Delivery";
  let selectedService:ServiceOption|null=null;
  if(services.length>0){
    const requested=String(serviceType??"").trim();
    if(!requested)return{ok:false,status:400,error:"Please select a delivery service."};
    selectedService=services.find((option)=>option.name.toLocaleLowerCase()===requested.toLocaleLowerCase())??null;
    if(!selectedService)return{ok:false,status:400,error:"That delivery service is not available."};
    resolvedService=selectedService.name;
  }

  const distanceResult=await calculateDrivingDistance(startLocation,endLocation);let distance:number;let durationMinutes:number|null=null;
  if(distanceResult!==null){distance=distanceResult.distanceMiles;durationMinutes=distanceResult.durationMinutes;}else if(typeof clientDistanceFallback==="number"&&clientDistanceFallback>0){distance=clientDistanceFallback;}else{return{ok:false,status:400,error:"Could not calculate distance. Please check your addresses."};}
  const detailed=estimatePriceDetailed(distance,pricingProfile,extras);let total=detailed.total;const lineItems:PriceLineItem[]=[...detailed.lineItems];

  if(selectedService&&selectedService.fee>0){
    total+=selectedService.fee;
    lineItems.push({key:`service:${selectedService.name}`,label:selectedService.name,amount:selectedService.fee,detail:selectedService.description||"Service charge"});
  }

  if(vehicleCount&&vehicleCount>0){let widgetSettings=ownedWidgetSettings;if(!widgetSettings){const fallback=await prisma.widgetSettings.findFirst({where:{companyId},select:{id:true,showVehicles:true,pricePerVehicle:true}});if(fallback)widgetSettings=fallback;}if(widgetSettings?.showVehicles&&widgetSettings.pricePerVehicle>0){const vehicleAmount=widgetSettings.pricePerVehicle*vehicleCount;total+=vehicleAmount;lineItems.push({key:"vehicles",label:`Vehicles, ${vehicleCount}`,amount:vehicleAmount,detail:`${vehicleCount} × $${widgetSettings.pricePerVehicle.toFixed(2)}`});}}
  const ruleResult=await applyPricingRules(companyId,distance,extras,total);total=ruleResult.total;lineItems.push(...ruleResult.lineItems);
  return{ok:true,quote:{total,distance,durationMinutes,serviceType:resolvedService,breakdown:{total,lineItems,distanceMiles:detailed.distanceMiles,freeMiles:detailed.freeMiles,billableMiles:detailed.billableMiles,minimumApplied:detailed.minimumApplied}}};
}
