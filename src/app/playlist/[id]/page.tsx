"use client"
import { Button, FavHeader, FavSong, GlobalContext, Header } from "@/components"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md"
import { CustomPlaylistProps } from "@/lib/types"
import { FaPlay } from "react-icons/fa"
function Playlist({params}:any) {
    const {id}=params
    const router=useRouter()
    const [playlist,setPlaylist]=useState<CustomPlaylistProps>()
    const [user,setUser]=useState()
    const [logoutLoading,setLogoutLoading]=useState<boolean>(false)
    const {isLoggedIn,setIsLoggedIn,setIsLoggedOut,setOpenLoginModel,setOpenRegisterModel,setOpenSongsModel}=useContext(GlobalContext)
    async function getPlaylist(){
try {
    const res=await axios.get(`/api/get-playlist/${id}`)
    console.log(res.data)
    if(res.status==200){
        setPlaylist(res.data)
    }
    
} catch (error) {
    console.log(error)
}
    }


    async function checkUser(){
        const res=await axios.get("/api/checkuser")
        if(res.data){
          setIsLoggedIn(res.data.Message)
          if(res.data.user){
            setUser(res.data.user)
          }
        }
        }
    async function logout(){
        try {
          setLogoutLoading(true)
          const res=await axios.get("/api/logout")
          console.log(res.data)
          checkUser()
      setIsLoggedOut(true)
          setLogoutLoading(false)
        } catch (error) {
          console.log(error)
        }finally{
          setLogoutLoading(false)
        }
      }
      

useEffect(()=>{
    getPlaylist()
},[id])
console.log(playlist)
  return (
    <div className="bg-bg rounded-lg w-full h-[84.4vh]  overflow-y-scroll overflow-x-hidden ">
     <Header>
     <div className="bg-gradient-to-b from-emerald-800  flex flex-col gap-4">
 
 <div className="w-full py-4 flex items-center justify-between px-4">
     <div className="flex items-center justify-start gap-4">
         <button className="bg-black text-white rounded-full w-[2rem] h-[2rem] flex items-center justify-center hover:bg-neutral-700" onClick={()=>router.back()}><MdArrowBackIosNew size={13}/></button>
         <button className="bg-black text-white rounded-full w-[2rem] h-[2rem] flex items-center justify-center hover:bg-neutral-700" onClick={()=>router.forward()}><MdArrowForwardIos size={13}/></button>
     </div>
     
     <div className="flex gap-2 items-center justify-center">
{isLoggedIn?<><Button className="py-1 px-8 bg-transparent text-white font-semibold flex items-center justify-center rounded-3xl hover:text-black" onClick={logout} loading={logoutLoading}>Logout</Button></>:<><Button type="text" className="py-1 px-8 bg-transparent text-white font-semibold flex items-center justify-center rounded-3xl hover:text-black" onClick={()=>setOpenRegisterModel(true)}>Sign up</Button>
<Button className="py-1 px-8 bg-white text-bg font-bold flex items-center justify-center rounded-3xl hover:text-black" onClick={()=>setOpenLoginModel(true)}>Login</Button></>}
       
     </div>
 </div>
 <div className="w-full h-[25vh] py-8 flex items-center justify-start gap-4 px-4 flex-col md:flex-row">
   <div className="w-[100px] h-full relative ">
     <Image src={playlist?.playlist_cover} fill alt="Image" className="object-cover"/>
   </div>
 <h2 className="text-md md:text-3xl font-bold text-white">{playlist?.playlist_name}</h2>

 </div>

</div>
     </Header>
     <div className="w-full h-[70%] flex items-start p-4 justify-start flex-col gap-4">

{/* populate songs from playlist and map over there */}
 <div className="text-white">Playlist songs</div>


     </div>
    </div>
  )
}

export default Playlist