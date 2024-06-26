import { connectDb } from "@/lib/connectDb";
import Songs from "@/modles/songs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    connectDb()
    try {
        const data=await req.formData()
        const title=data.get("title")
       const songs=await Songs.find({title:{$regex:title,$options:"i"}})
       return NextResponse.json(songs)
    } catch (error) {
        console.log(error)
        return NextResponse.json({"message":"Something went wrong"})
    }
 

}