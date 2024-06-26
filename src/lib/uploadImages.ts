import { arrayBuffer } from "stream/consumers";
import cloudinary from "./cloudinaryconfig";

export async function uploadToCloudinary(file:any,folder:string){
    const buffer=await file.arrayBuffer()
    const bytes=Buffer.from(buffer)
return new Promise(async (resolve,reject)=>{
    await cloudinary.uploader.upload_stream({
        resource_type:"auto",
        folder:folder
    },async (err,result)=>{
        if(err){
            reject(err.message)
        }
        resolve(result)
    }).end(bytes)
})
}