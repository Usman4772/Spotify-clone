"use client"
import { GlobalContext } from "@/components/context"
import Image from "next/image"
import { useContext } from "react"


function LibrarySong({data,index}:any) {
  const {setCurrentSongIndex}=useContext(GlobalContext)
  return (
    <div className="w-full min-h-[9vh] bg-transparent hover:bg-neutral-800 flex items-start justify-start gap-2 rounded-lg overflow-hidden cursor-pointer" onClick={()=>setCurrentSongIndex(index)}>
        <div className="w-[25%] h-full relative">
            <Image src={data.songCover} fill alt="cover" />
        </div>
<div className="w-[75%] flex items-start justify-start flex-col ">
<h2 className=" w-[75%] font-semibold text-white truncate">{data.title}</h2>
<p className="text-sm text-neutral-400">{data.author}</p>
</div>

    </div>
  )
}

export default LibrarySong