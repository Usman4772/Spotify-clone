import { connectDb } from "@/lib/connectDb";
import getLoggedInUserId from "@/lib/getLoggedInUserId";
import User from "@/modles/user";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest){
    connectDb()
    const userId=await getLoggedInUserId(req)
    if(userId){
        const user=await User.findOne({_id:userId}).populate("liked_songs")
        console.log(user)
        return NextResponse.json({"Message":"success","user":user})
    }
    return NextResponse.json({"Message":"failure"})
}