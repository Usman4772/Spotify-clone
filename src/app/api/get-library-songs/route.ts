import { connectDb } from "@/lib/connectDb";
import User from "@/modles/user";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    connectDb()
    const userId=await getLoggedInUserId(req)
    if(userId){
const user=await User.findOne({_id:userId}).populate("songs")
return NextResponse.json(user)
    }
    return NextResponse.json({"Message":"you need to login first"})
    
}


async function getLoggedInUserId(req:NextRequest){
    const token=await req.cookies.get("jwt")?.value
    if(token){
        const verifiedToken=await jwtVerify(token,new TextEncoder().encode("$ecrete_sign"))
        if(verifiedToken){
            const token=await verifiedToken
         const id=token.payload.id
         return id
        }
    }
}