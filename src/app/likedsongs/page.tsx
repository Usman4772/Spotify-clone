"use client"
import { Header,FavSong,FavHeader, GlobalContext } from "@/components"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
function LikedSongs() {
  const [loading,setLoading]=useState<boolean>(false)
  const {checkLike,favSongs,setFavSongs}=useContext(GlobalContext)
    async function getFavSongs(){
      setLoading(true)
const res=await axios.get("/api/get-fav")
if(res.data.Message==="success"){
setFavSongs(res.data.user.liked_songs)

}
setLoading(false)
    }
    useEffect(()=>{
        getFavSongs()
    },[checkLike])
  return (
    <div className="bg-bg rounded-lg w-full h-[84.4vh]  overflow-y-scroll overflow-x-hidden ">
     <Header><FavHeader/></Header>
     <div className="w-full h-[70%] flex items-start p-4 justify-start flex-col gap-4">
 {loading?<div className="w-full h-[70%]  flex items-center justify-center"><Spin indicator={<LoadingOutlined spin/>} /></div>:<>{favSongs && favSongs.length>0?favSongs.map((song:object,i:number)=>{
  return <FavSong key={i} data={song} index={i}/>
}):<div className="w-full h-[70%] flex items-center justify-center text-white font-bold text-xl">No Favourites Found</div>}</>}     

     </div>
    </div>
  )
}

export default LikedSongs