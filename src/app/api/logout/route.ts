import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req:NextRequest){
    cookies().set("jwt","")
return NextResponse.json({"Message":"Logged out successfully"})
}