import { connectDb } from "@/lib/connectDb";
import getLoggedInUserId from "@/lib/getLoggedInUserId";
import { uploadToCloudinary } from "@/lib/uploadImages";
import Playlists from "@/modles/playlists";
import User from "@/modles/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    connectDb()
    const data=await req.formData()
    const title=data.get("title")
    const imageData=data.get("cover")
  const userId=await getLoggedInUserId(req)
  const user=await User.findOne({_id:userId})
  const image=await uploadToCloudinary(imageData,"spotify-images") as any
const playlist=await Playlists.create({
    playlist_name:title,
    playlist_cover:image.secure_url,
    user:user._id
})
console.log(playlist)
user.playlists.push(playlist)
await user.save()
    return NextResponse.json({"message":"success"})
}