import User from "@/modles/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { connectDb } from "@/lib/connectDb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
export async function POST(req:NextRequest){
    connectDb()
    try {
        const data=await req.json()
        const {email,password}=data
        const user=await checkUser(email,password)
    if(user){
        const token=await createToken(user._id)
        cookies().set("jwt",token)
    }
    
        return NextResponse.json({"Message":"success"}) 
    } catch (error:any) {
    
        return NextResponse.json({"Message":"failure"})
    }
  
}


async function checkUser(email:string,password:string){
    const user=await User.findOne({email})
    if(user){
        const auth=await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }else{
            throw new Error("Incorrect password")
        }
    }else{
        throw new Error("Invalid Email")
    }
}


async function createToken(id:any){
    return await jwt.sign({id},"$ecrete_sign")
}