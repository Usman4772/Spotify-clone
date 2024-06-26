"use client"
import { TbPlaylist } from "react-icons/tb";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import LibrarySong from "./components/LibrarySong";
import axios from "axios";
import AddBtn from "../AddBtn/AddBtn";
function Library() {
  const {setOpenSongsModel,allSongs,isLoggedOut}=useContext(GlobalContext)
  const [librarySongs,setLibrarySongs]=useState<Array<object> | []>([])
async function getLibrarySongs(){
  const res=await axios.get("/api/get-library-songs")
 if(res.data.songs){
  setLibrarySongs(res.data.songs)
 }else{
  setLibrarySongs([])
 }
}
  useEffect(()=>{
getLibrarySongs()
  },[allSongs,isLoggedOut])
  return (
    <div className='w-full h-full flex flex-col gap-4  px-2 overflow-y-scroll overflow-x-hidden relative'>
        <div className='w-full h-[6rem] flex items-center justify-between sticky top-0 z-10 bg-bg py-4'>
<div className='flex gap-4 items-center justify-center'>
<TbPlaylist className="text-neutral-400 text-lg font-semibold"/>
<p className='text-neutral-400 font-semibold text-lg'>Library</p>
</div>
<AddBtn/>
        </div>
        <div className="w-full h-[40rem] flex items-start justify-start flex-col gap-4  py-2">
          {librarySongs && librarySongs.length>0?librarySongs.map((song:object,i:number)=>{
            return <LibrarySong key={i} data={song} index={i}/>
          }):<div className="w-full h-full flex items-center justify-center text-white font-semibold">No Songs Found</div>}
        </div>
    </div>
  )
}

export default Library