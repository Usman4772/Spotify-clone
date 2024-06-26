import mongoose from "mongoose";
let isConnected=false
export async function connectDb(){
    if(isConnected)return
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/spotify-clone")
        console.log("Database Connected")
        isConnected=true
    } catch (error) {
        console.log("Database not connected ", error)
    }
}