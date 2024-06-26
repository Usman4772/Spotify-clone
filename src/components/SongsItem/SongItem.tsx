"use client"
import {useUser,useLike,GlobalContext} from "@/components"
import Image from "next/image"
import { useContext, useState } from "react"
import { FaPlay,FaHeart ,FaRegHeart} from "react-icons/fa"
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import toast from "react-hot-toast"
import axios from "axios"


function SongItem({data,index}:any) {
  const {setCheckUser,setCheckLike,currentSongIndex,setCurrentSongIndex}=useContext(GlobalContext)
  const {user}=useUser()
  const {like}=useLike(data._id)
 

  const Icon=like?FaHeart:FaRegHeart
  async function handleAddToLikes(){
    setCheckUser((prev:any)=>!prev)
    setCheckLike((prev:any)=>!prev)
    if(!user)return toast.error("Please Loggin first!")
    const res=await axios.get(`/api/add-to-likes/${data._id}`)
    // console.log(res.data)
  }
  
  function handleClick(){
    console.log("opened")
  }
  return (
    <div className="w-[120px] h-[180px] bg-neutral-900 hover:bg-neutral-800 transition rounded-lg flex items-center justify-center relative flex-col overflow-hidden p-1 group  cursor-pointer">
        <div className="w-full h-[60%] relative">
            <Image src={data.songCover} fill alt="Cover" className="object-cover rounded-md"/>
        </div>
       <div className="w-full h-[40%]">
       <h2 className="w-full text-start font-semibold text-white truncate text-sm ">{data.title}</h2>
       <p className="text-neutral-300 text-sm w-full text-start  truncate">{data.author}</p>
       </div>
        <div className="w-[2.2rem] h-[2.2rem] opacity-0 bg-green-500 flex items-center justify-center rounded-full absolute right-2 bottom-16 group-hover:opacity-100 hover:scale-110 " onClick={()=>setCurrentSongIndex(index)}>{index!==currentSongIndex?<FaPlay className="text-sm"/>:<div className="w-[.3rem] h-[.3rem]"><Image src="/images/playing2.gif" fill alt="playing" className="cover rounded-full"/> </div>}</div>
        <button className="w-full relative" onClick={handleAddToLikes}><Icon className={like?"text-green-500  absolute bottom-2 right-2 text-xl":"text-white  absolute bottom-2 right-2 text-xl"}/></button>
        <PiDotsThreeVerticalBold className="text-white  absolute left-2 bottom-2" onClick={handleClick}/>
    </div>
  )
}

export default SongItem