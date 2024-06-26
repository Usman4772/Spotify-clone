"use client"
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos ,MdArrowBackIosNew} from "react-icons/md";
import {PlaylistItem,GlobalContext} from "@/components"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import usePlaylists from "@/hooks/usePlaylists";
function HeaderContent() {
  const router=useRouter()
const {openRegisterModel,setOpenRegisterModel,openLoginModel,setOpenLoginModel,isLoggedIn,setIsLoggedIn,user,setUser,setIsLoggedOut}=useContext(GlobalContext)
const [logoutLoading,setLogoutLoading]=useState<boolean>(false)
const {playlists}=usePlaylists()
console.log(playlists)

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
  checkUser()
},[openRegisterModel,openLoginModel])


// async function getUserPlaylists(){
//   try {
//     const res=await axios.get('/api/get-playlists')
//     if(res.status==200){
//       setPlaylists(res.data.user.playlists)
//     }
//   } catch (error) {
//     console.log(error)
//   }


// }
// useEffect(()=>{
//   console.log("requesting")
//   getUserPlaylists()
// },[showPlaylsitForm])

// console.log(playlists)
  return (
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
{user && isLoggedIn ?  <h1 className="text-white font-semibold text-2xl px-4 font-sans">Welcome back <span className="font-bold text-neutral-300 capitalize">{user.username}</span> <span className="font-semibold text-neutral-100 capitalize"></span></h1>:null}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 gap-4">
<PlaylistItem  image="/images/liked.jpg" title="Liked Songs"/>
{/* {playlists && playlists.length>0?playlists.map((playlist:any,i:number)=>{
  return <PlaylistItem  image={playlist.playlist_cover} title={playlist.playlist_name} id={playlist._id}/>
}):null} */}
        </div>
    </div>
  )
}

export default HeaderContent