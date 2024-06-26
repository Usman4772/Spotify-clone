import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const playlistId=req.url.split("/")[5]
    return NextResponse.json("hi")
}