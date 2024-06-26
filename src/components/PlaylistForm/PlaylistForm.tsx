"use client"
import { ChangeEvent, useContext, useRef, useState } from "react"
import { GlobalContext,Button,MdOutlineCancel,TiUploadOutline } from "@/components";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";


function PlaylistForm() {
  const {showPlaylsitForm,setShowPlaylsitForm}=useContext(GlobalContext)
  const [playlistCover,setPlaylistCover]=useState<File | null>()
  const [loading,setLoading]=useState<boolean>(false)
  const playlistCoverRef=useRef<any>(null)
const [title,setTitle]=useState<string>("")

  function handleCoverChange(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files){
      setPlaylistCover(e.target.files[0])
    }
  }
  
  function selectCover(){
    playlistCoverRef.current?.click()
  }

async function handleCreatePlaylist(e:any){
  e.preventDefault()
if(title=="" || playlistCover==undefined)return toast.error("Please fill all the fields")
  const formData=new FormData()
formData.append("title",title)
formData.append("cover",playlistCover)
try {
  setLoading(true)
  const res=await axios.post("/api/create-playlist",formData)
  console.log(res.data)
if(res.data.invalidToken)return toast.error("Please login first")
} catch (error) {
  console.log(error)
}finally{
  setLoading(false)
  setShowPlaylsitForm(false)
}

}

  return (
 <div>
   {showPlaylsitForm?<div className="w-screen h-screen text-center  flex items-center justify-center register absolute z-50 ">
  <div className="w-[400px] h-[500px] bg-black rounded-lg flex flex-col gap-4 items-center justify-center  relative">
<MdOutlineCancel className="absolute top-4 right-4 text-white text-xl cursor-pointer" onClick={()=>setShowPlaylsitForm(false)}/>
<div className="w-[5rem] h-[5rem] rounded-full relative overflow-hidden"><Image src="/images/logo1.png" fill alt="logo"/></div>
    <h2 className="text-white text-md font-semibold font-sans">Add a new<span className="text-green-500 font-bold text-xl font-sans"> Playlist</span></h2>
    <form className="w-full px-8 flex items-center justify-center flex-col gap-4">
<div className="w-full flex items-start justify-center flex-col gap-2">
<label className="font-semibold text-md font-sans text-white">Playlist Title</label>
 <input type="text" placeholder="Playlist title" className="text-white px-4 py-2 w-full h-[6vh] focus:outline-none bg-transparent border border-neutral-400 rounded-lg" value={title} onChange={(e)=>setTitle(e.target.value)}/>
</div>


<div>
<input type='file' name="coverImage" onChange={handleCoverChange} hidden ref={playlistCoverRef} accept="image/jpg,image/jpeg,image/avif,image/png" required/>
<Button icon={<TiUploadOutline />} onClick={selectCover} className="px-12 py-2 flex items-center justify-center bg-black text-white borrder border-neutral-400 outline-none">Cover Image</Button>
</div>

<Button className="bg-green-500 py-2 px-8 flex items-center justify-center font-semibold text-white rounded-md outline-none border-none" onClick={handleCreatePlaylist} loading={loading}>Create</Button>
    </form>
  </div>
  </div>:null}
 </div>
  )
}

export default PlaylistForm