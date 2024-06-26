import Image from "next/image"
import { GlobalContext, useLike, useUser } from "@/components"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import toast from "react-hot-toast"
import axios from "axios"
import { useContext } from "react"
function FavSong({data,index}:any) {
  const {like}=useLike(data._id)
  const {user}=useUser()
const {setCheckUser,setCheckLike,setCurrentSongIndex}=useContext(GlobalContext)
  const Icon=like?FaHeart:FaRegHeart
  async function handleAddToLikes(){
    setCheckUser((prev:any)=>!prev)
    setCheckLike((prev:any)=>!prev)
    if(!user)return toast.error("Please Loggin first!")
    const res=await axios.get(`/api/add-to-likes/${data._id}`)
  }
  return (
    <div className="w-full overflow-hidden h-[10vh] bg-transparent rounded-md hover:bg-neutral-800 flex items-center justify-between  pe-8  cursor-pointer" onClick={()=>setCurrentSongIndex(index)}>
      <div className="flex gap-4 items-center justify-center h-full">
      <div className="w-[64px] h-full relative">
        <Image src={data.songCover} fill alt="Cover" className="object-cover rounded-md"/>
      </div>
<div className="flex flex-col ">
<h2 className="font-semibold text-white ">{data.title}</h2>
<p className="text-neutral-400">{data.author}</p>
</div>
</div>
<button className="h-full relative flex items-center justify-center" onClick={handleAddToLikes}><Icon className={like?"text-green-500  text-xl":"text-white  text-xl"}/></button>
    </div>
  )
}

export default FavSong