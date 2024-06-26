import { connectDb } from "@/lib/connectDb";
import User from "@/modles/user";
import {jwtVerify} from "jose"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    connectDb()

    const jwt=req.cookies.get("jwt")
    if( jwt?.value!==undefined && jwt.value!==""){
        try {
            const userId=await getLoggedInUserID(jwt?.value)
            const user=await User.findOne({_id:userId})
          
            if(user){
                return NextResponse.json({"Message":true,"user":user})
            }
    
        } catch (error) {
        return NextResponse.json({"Message":false})
        }
    }

    return NextResponse.json({"Message":false})
  

}


async function getLoggedInUserID(token:any){
    if(token){
        const verifiedToken=await token && jwtVerify(token,new TextEncoder().encode("$ecrete_sign"))
        if(verifiedToken){
            const token=await verifiedToken
            const id=token.payload.id
            return id
        }

    }

}