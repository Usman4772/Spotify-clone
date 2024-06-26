import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        required:true
    },
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Song"
        }
    ],
    liked_songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Song"
        }
    ],
    playlists_array:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Playlists"
        }
    ]
})


const User=mongoose.models.User || mongoose.model("User",userSchema)
export default User