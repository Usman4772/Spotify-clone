import { connectDb } from "@/lib/connectDb";
import getLoggedInUserId from "@/lib/getLoggedInUserId";
import Songs from "@/modles/songs";
import User from "@/modles/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    connectDb()
const songId=req.url.split("/")[5]
// console.log(songId)
const userId=await getLoggedInUserId(req)
// const song=await Songs.findOne({_id:songId})
// song.liked_by.forEach((id:any)=>console.log(id==userId))//here
if(userId){
    const user=await User.findOne({_id:userId})
    const isAlreadyPresent=user.liked_songs.includes(songId)
    if(isAlreadyPresent){
   return NextResponse.json({"isPresent":true})
    }
    return NextResponse.json({"isPresent":false})
    
}
return NextResponse.json({"isNotLoggedIn":true})
}