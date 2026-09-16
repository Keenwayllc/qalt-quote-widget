import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getPublicQuoteDocument } from "@/lib/customer-document-access";
import { fireWebhooks } from "@/lib/webhooks";
import { ensureBookingForQuote } from "@/lib/growth-engine";

export const dynamic = "force-dynamic";
const PRIVATE_HEADERS={"Cache-Control":"private, no-store, max-age=0",Pragma:"no-cache","X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer"};

export async function POST(_req:Request,{params}:{params:Promise<{token:string}>}){
  const {token}=await params;const document=await getPublicQuoteDocument(token);if(!document)return NextResponse.json({error:"Quote not found"},{status:404,headers:PRIVATE_HEADERS});
  const quote=await prisma.quoteRequest.findFirst({where:{id:document.quoteRequestId,companyId:document.companyId,deletedAt:null}});if(!quote)return NextResponse.json({error:"Quote not found"},{status:404,headers:PRIVATE_HEADERS});
  if(["LOST","CANCELLED"].includes(quote.status))return NextResponse.json({error:"This quote is no longer available."},{status:409,headers:PRIVATE_HEADERS});
  if(["CONFIRMED","WON","PAID"].includes(quote.status)){await ensureBookingForQuote(document.companyId,quote.id);return NextResponse.json({success:true,status:quote.status},{headers:PRIVATE_HEADERS});}
  const updated=await prisma.quoteRequest.updateMany({where:{id:quote.id,companyId:document.companyId,deletedAt:null,status:"PENDING"},data:{status:"CONFIRMED"}});
  if(updated.count===1){await ensureBookingForQuote(document.companyId,quote.id);fireWebhooks(document.companyId,"quote.status_changed",{quote:{id:quote.id,status:"CONFIRMED",previousStatus:quote.status}});}
  return NextResponse.json({success:true,status:"CONFIRMED"},{headers:PRIVATE_HEADERS});
}
