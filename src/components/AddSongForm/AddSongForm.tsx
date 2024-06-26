"use client"
import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react"
import { GlobalContext,Button,MdOutlineCancel,TiUploadOutline } from "@/components";
import { HiUpload } from "react-icons/hi";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
function AddSongsForm() {
  const {openSongsModel,setOpenSongsModel}=useContext(GlobalContext)
  const [songCover,setSongCover]=useState<File | null>()
  const [song,setSong]=useState<File | null>()
  const [loading,setLoading]=useState<boolean>(false)
  const fileCoverInputRef=useRef<any>(null)
  const songFileRef=useRef<any>(null)
  const [formValues,setFormValues]=useState({
title:"",
author:""
  
  })

  function handleCoverChange(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files){
      setSongCover(e.target.files[0])
    }
  }
  
  function selectCover(){
    fileCoverInputRef.current?.click()
  }

  function selectSong(){
    songFileRef.current?.click()
  }

  function validate(){
const {title,author}=formValues
if(title!=="" && author!=="" && songCover!==undefined && song!==undefined ) return true
return false

  }


  function handleSongChange(e:ChangeEvent<HTMLInputElement>){
if(e.target.files){
    setSong(e.target.files[0])
}
  }

  async function handleSongUpload(e:FormEvent){
    e.preventDefault()

 try {
  const isValid=validate()
  if(!isValid)return toast.error("Please fill all the fields ")
  setLoading(true)
const formData=new FormData()
formData.append("title",formValues.title)
formData.append("author",formValues.author)
if(songCover){formData.append("cover",songCover)}
if(song){formData.append("song",song)}

const res=await axios.post("/api/addsong",formData)
if(res.data.invalidToken){
  toast.error("You need to loggin first!")
  setLoading(false)
setOpenSongsModel(false)
setTimeout(()=>{toast.dismiss()},1500)
}else{
  setLoading(false)
setOpenSongsModel(false)
}
 } catch (error) {
  setLoading(false)
  setOpenSongsModel(false)
  console.log(error)
 }   



  }

  return (
 <div>
   {openSongsModel?<div className="w-screen h-screen text-center  flex items-center justify-center register absolute z-50 ">
  <div className="w-[400px] h-[500px] bg-black rounded-lg flex flex-col gap-4 items-center justify-center  relative">
<MdOutlineCancel className="absolute top-4 right-4 text-white text-xl cursor-pointer" onClick={()=>setOpenSongsModel(false)}/>
<div className="w-[5rem] h-[5rem] rounded-full relative overflow-hidden"><Image src="/images/logo1.png" fill alt="logo"/></div>
    <h2 className="text-white text-md font-semibold font-sans">Add a new<span className="text-green-500 font-bold text-xl font-sans"> Song</span></h2>
    <form className="w-full px-8 flex items-center justify-center flex-col gap-4">
<div className="w-full flex items-start justify-center flex-col gap-2">
<label className="font-semibold text-md font-sans text-white">Title</label>
 <input type="text" placeholder="Song title" className="text-white px-4 py-2 w-full h-[6vh] focus:outline-none bg-transparent border border-neutral-400 rounded-lg" value={formValues.title} onChange={(e)=>setFormValues({...formValues,title:e.target.value})}/>
</div>
<div className="w-full flex items-start justify-center flex-col gap-2">
<label className="font-semibold text-md font-sans text-white">Author</label>
 <input type="text" placeholder="Author" className="text-white px-4 py-2 w-full h-[6vh] focus:outline-none bg-transparent border border-neutral-400 rounded-lg" value={formValues.author} onChange={(e)=>setFormValues({...formValues,author:e.target.value})}/>
</div>

<div>
<input type='file' name="coverImage" onChange={handleCoverChange} hidden ref={fileCoverInputRef} accept="image/jpg,image/jpeg,image/avif,image/png" required/>
<Button icon={<TiUploadOutline />} onClick={selectCover} className="px-12 py-2 flex items-center justify-center bg-black text-white borrder border-neutral-400 outline-none"> Cover Image</Button>
</div>
<div>
<input type='file' name="songFile" onChange={handleSongChange} hidden ref={songFileRef} accept="audio/mpeg" required/>
<Button icon={<HiUpload />} onClick={selectSong} className="px-12 py-2 flex items-center justify-center bg-black text-white borrder border-neutral-400 outline-none">Upload Song</Button>
</div>
<Button className="bg-green-500 py-2 px-8 flex items-center justify-center font-semibold text-white rounded-md outline-none border-none" onClick={handleSongUpload} loading={loading}>Submit</Button>
    </form>
  </div>
  </div>:null}
 </div>
  )
}

export default AddSongsForm