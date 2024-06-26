import { connectDb } from "@/lib/connectDb";
import Songs from "@/modles/songs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    connectDb()
    const allSongs=await Songs.find({})
    if(allSongs){
        return NextResponse.json(allSongs)

    }else{
        return NextResponse.json({"Message":"Something went Wrong!"})
    }
}
