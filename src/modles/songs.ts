import mongoose, { Mongoose } from "mongoose";
const songSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    songCover:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    song_path:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    liked_by:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
})

const Songs=mongoose.models.Song || mongoose.model("Song",songSchema)
export default Songs