import getLoggedInUserId from "@/lib/getLoggedInUserId";
import User from "@/modles/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const userId=await getLoggedInUserId(req)
    if(!userId)return NextResponse.json({"message":"failure"})
        console.log("here")
        const user=await User.findOne({_id:userId}).populate("playlists")
    console.log(user)
    return NextResponse.json("hi")
}