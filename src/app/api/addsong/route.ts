import { connectDb } from "@/lib/connectDb";
import { uploadToCloudinary } from "@/lib/uploadImages";
import Songs from "@/modles/songs";
import User from "@/modles/user";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    connectDb()
   const data=await req.formData()
   const songFile=data.get("song")
   const coverFile=data.get("cover")
   const title=data.get("title")
   const author=data.get("author")
   const songUrl=await uploadToCloudinary(songFile,"songs") as any
   const coverUrl=await uploadToCloudinary(coverFile,"spotify-images") as any
   const userId=await getLoggedInUserID(req)
   const user=await User.findOne({_id:userId})
   if(user){
   const song=await Songs.create({
    title,
    author,
    song_path:songUrl?.secure_url,
    songCover:coverUrl?.secure_url,
    user:user._id

   })
user.songs.push(song._id)
await user.save()
return NextResponse.json({"Message":"song uploaded"})
   }else{
    return NextResponse.redirect(new URL("/login",req.url))
   }



}


async function getLoggedInUserID(req:NextRequest){
    const token=req.cookies.get("jwt")?.value
    if(token){
        const verifiedToken=await token && jwtVerify(token,new TextEncoder().encode("$ecrete_sign"))
        if(verifiedToken){
            const token=await verifiedToken
            const id=token.payload.id
            return id
        }

    }

}