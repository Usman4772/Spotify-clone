import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { connectDb } from "@/lib/connectDb";
import User from "@/modles/user";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { uploadToCloudinary } from "@/lib/uploadImages";
export async function POST(req:NextRequest){
    connectDb()
    try { 
 const data=await req.formData()
console.log(data)
const pass=data.get("password")
const hashedPassword=await hashPassword(pass)

const formImage=data.get("profileImage")   
 const image=await uploadToCloudinary(formImage,"spotify-images") as any

const user=await User.create({
    username:data.get("username"),
    email:data.get("email"),
    password:hashedPassword,
    profileImage:image.secure_url
})

const token=await createToken(user._id)

cookies().set("jwt",token)
return NextResponse.json({"Message":"success"})
    } catch (error:any) {
        if(error.code ===11000){
          return  NextResponse.json({"Message":"duplicate"})
        }
        return NextResponse.json({"Message":error})
    }
  

}


async function hashPassword(pass:any){
    const salt =bcrypt.genSaltSync(10)
    const hashedPassword=await bcrypt.hash(pass,salt)
    return hashedPassword
}


 function createToken(id:any){
return jwt.sign({id},"$ecrete_sign")
}