import "server-only";
import prisma from "@/lib/prisma";
import { estimatePriceDetailed, type EstimateExtras, type EstimateRules, type PriceLineItem } from "@/lib/calculator";
import { calculateDrivingDistance } from "@/lib/google-maps";
import { applyPricingRules } from "@/lib/growth-engine";

export type QuoteBreakdown = { total:number; lineItems:PriceLineItem[]; distanceMiles:number; freeMiles:number; billableMiles:number; minimumApplied:boolean };
export type AuthoritativeQuote = { total:number; distance:number; durationMinutes:number|null; breakdown:QuoteBreakdown };
export type QuoteComputationResult = { ok:true; quote:AuthoritativeQuote } | { ok:false; status:number; error:string };
type ComputeInput = { companyId:string; formId?:string|null; startLocation:string; endLocation:string; extras:EstimateExtras; vehicleCount?:number; clientDistanceFallback?:number|null };

export async function computeAuthoritativeQuote(input:ComputeInput):Promise<QuoteComputationResult>{
  const {companyId,formId,startLocation,endLocation,extras,vehicleCount,clientDistanceFallback}=input;
  if(!startLocation||!endLocation)return{ok:false,status:400,error:"Missing location data"};
  let ownedWidgetSettings:{id:string;showVehicles:boolean;pricePerVehicle:number}|null=null;
  if(formId){const form=await prisma.widgetSettings.findUnique({where:{id:formId},select:{id:true,companyId:true,showVehicles:true,pricePerVehicle:true}});if(!form||form.companyId!==companyId)return{ok:false,status:404,error:"Form not found"};ownedWidgetSettings={id:form.id,showVehicles:form.showVehicles,pricePerVehicle:form.pricePerVehicle};}
  let pricingProfile:EstimateRules|null=null;
  if(formId){const fp=await prisma.pricingProfile.findUnique({where:{widgetSettingsId:formId}});if(fp)pricingProfile=fp as unknown as EstimateRules;}
  if(!pricingProfile){const dp=await prisma.pricingProfile.findFirst({where:{companyId,widgetSettingsId:null}});if(dp)pricingProfile=dp as unknown as EstimateRules;}
  if(!pricingProfile)return{ok:false,status:404,error:"Pricing not configured"};
  const distanceResult=await calculateDrivingDistance(startLocation,endLocation);let distance:number;let durationMinutes:number|null=null;
  if(distanceResult!==null){distance=distanceResult.distanceMiles;durationMinutes=distanceResult.durationMinutes;}else if(typeof clientDistanceFallback==="number"&&clientDistanceFallback>0){distance=clientDistanceFallback;}else{return{ok:false,status:400,error:"Could not calculate distance. Please check your addresses."};}
  const detailed=estimatePriceDetailed(distance,pricingProfile,extras);let total=detailed.total;const lineItems:PriceLineItem[]=[...detailed.lineItems];
  if(vehicleCount&&vehicleCount>0){let widgetSettings=ownedWidgetSettings;if(!widgetSettings){const fallback=await prisma.widgetSettings.findFirst({where:{companyId},select:{id:true,showVehicles:true,pricePerVehicle:true}});if(fallback)widgetSettings=fallback;}if(widgetSettings?.showVehicles&&widgetSettings.pricePerVehicle>0){const vehicleAmount=widgetSettings.pricePerVehicle*vehicleCount;total+=vehicleAmount;lineItems.push({key:"vehicles",label:`Vehicles, ${vehicleCount}`,amount:vehicleAmount,detail:`${vehicleCount} × $${widgetSettings.pricePerVehicle.toFixed(2)}`});}}
  const ruleResult=await applyPricingRules(companyId,distance,extras,total);total=ruleResult.total;lineItems.push(...ruleResult.lineItems);
  return{ok:true,quote:{total,distance,durationMinutes,breakdown:{total,lineItems,distanceMiles:detailed.distanceMiles,freeMiles:detailed.freeMiles,billableMiles:detailed.billableMiles,minimumApplied:detailed.minimumApplied}}};
}
