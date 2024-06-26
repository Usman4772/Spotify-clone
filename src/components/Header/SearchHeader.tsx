"use client"
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos ,MdArrowBackIosNew} from "react-icons/md";
import {GlobalContext , SearchInput} from "@/components"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
function SearchHeader() {
  const router=useRouter()
const {openRegisterModel,setOpenRegisterModel,openLoginModel,setOpenLoginModel,isLoggedIn,setIsLoggedIn,user,setUser,isLoggedOut,setIsLoggedOut}=useContext(GlobalContext)
const [logoutLoading,setLogoutLoading]=useState<boolean>(false)
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
<SearchInput/>
    </div>
  )
}

export default SearchHeader