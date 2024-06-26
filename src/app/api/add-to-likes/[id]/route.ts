import { connectDb } from "@/lib/connectDb";
import getLoggedInUserId from "@/lib/getLoggedInUserId";
import Songs from "@/modles/songs";
import User from "@/modles/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
   connectDb()
const songId=req.url.split("/")[5]
const song=await Songs.findOne({_id:songId})
const userId=await getLoggedInUserId(req)

if(userId){
    const user=await User.findOne({_id:userId})
    const isAlreadyPresent=user.liked_songs.includes(songId)
    if(isAlreadyPresent){
       user.liked_songs= user.liked_songs.filter((id:any)=>id.toString()!==songId.toString())
       song.liked_by=song.liked_by.filter((id:any)=>id.toString()!==userId.toString())

    }else{
        user.liked_songs.push(song)
        song.liked_by.push(user)
    }

    await user.save()
    await song.save()
    return NextResponse.json({"Message":"Success"})
}
return NextResponse.json({"Message":"failure"})
}