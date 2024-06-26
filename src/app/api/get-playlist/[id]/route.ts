import { connectDb } from "@/lib/connectDb";
import Playlists from "@/modles/playlists";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    console.log("here")
    connectDb()
    const playlistId=req.url.split("/")[5]
    console.log(playlistId)
    if(!playlistId)return NextResponse.json({"message":"Something went wrongs"})
        try {
            const playlist=await Playlists.findOne({_id:playlistId})
            return NextResponse.json(playlist)
        } catch (error) {
            throw new Error("Something went wrong")
        }
        
   
}