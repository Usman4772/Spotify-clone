import mongoose from "mongoose"
const playlistSchema=new mongoose.Schema({
    playlist_name:{
        type:String,
        required:true
    },
    playlist_cover:{
        type:String,
        required:true
    },
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Song"
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    playlist_authors:[]
})


const Playlists=mongoose.models.Playlists || mongoose.model("Playlists",playlistSchema)
export default Playlists; 