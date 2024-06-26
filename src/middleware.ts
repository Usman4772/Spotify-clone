import { jwtVerify } from "jose";
import { NextResponse,type NextRequest } from "next/server";

export async function middleware(req:NextRequest){
        if(req.nextUrl.pathname=="/api/addsong" || req.nextUrl.pathname=="/api/create-playlist"){

 const token=req.cookies.get("jwt")?.value

if(token){
    const verifiedToken=await jwtVerify(token,new TextEncoder().encode("$ecrete_sign"))
    console.log(verifiedToken)
   if(!verifiedToken){
    return NextResponse.json({"invalidToken":true})
   }
}else{
    return NextResponse.json({"invalidToken":true})
}

}
}