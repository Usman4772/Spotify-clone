"use client"
import Image from "next/image"
import Link from "next/link"
import { FaPlay } from "react-icons/fa"
import { GlobalContext } from ".."
import { useContext } from "react"
import { PlaylistProps } from "@/lib/types"

function PlaylistItem({
    image,
    title,
    id
}:PlaylistProps) {
const {setSongCategory}=useContext(GlobalContext)
  return (
    <Link href={title=="Liked Songs"?"/likedsongs":`/playlist/${id}`}>

  <button className="relative flex group bg-neutral-100/10 pr-4 transition rouned-md items-center justify-start gap-x-4 overflow-hidden rounded-md" >
    <div className=" relative min-w-[60px] min-h-[60px] object-cover">
        <Image src={image} alt="image" fill/>
    </div>
    <p className="text-white text-md font-semibold  truncate">{title}</p>
    <div className="w-[2.4rem] h-[2.4rem] absolute opacity-0 right-2 rounded-full bg-green-500 flex items-center justify-center group-hover:opacity-100 hover:scale-110" onClick={()=>setSongCategory("liked")}>
        <FaPlay className="text-black text-sm"/>
    </div>

  </button>
  </Link>
  )
}

export default PlaylistItem