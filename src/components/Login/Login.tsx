
"use client"
import { useContext, useState } from "react"
import { GlobalContext } from "../context"
import { Button } from "antd"
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

function LoginForm() {
  const {openLoginModel,setOpenLoginModel,setIsLoggedOut}=useContext(GlobalContext)
  const [formValues,setFormValues]=useState({email:"",password:""})
  const [loading,setLoading]=useState<boolean>(false)


  function validate(){
    const {email,password}=formValues
    if(email!=="" && password!=="")return true
    return false
  }
  async function handleLoginAccount(){
try {
  const isValidate=validate()
  if(!isValidate)return toast.error("Please fill all the fields")
    setLoading(true)
    const res=await axios.post("/api/login",formValues)
  if(res.data.Message!=="success")return toast.error("Incorrect Email or Password")
    setIsLoggedOut(false)
    setLoading(false)
} catch (error) {
   toast.error("Something went Wrong!")
}finally{
    setLoading(false)
    setOpenLoginModel(false)
}




  }
  return (
 <div>
   {openLoginModel?<div className="w-screen h-screen text-center  flex items-center justify-center register absolute z-50 ">
  <div className="w-[400px] h-[500px] bg-black rounded-lg flex flex-col gap-4 items-center justify-center  relative">
<MdOutlineCancel className="absolute top-4 right-4 text-white text-xl cursor-pointer" onClick={()=>setOpenLoginModel(false)}/>
    <div className="w-[5rem] h-[5rem] rounded-full relative overflow-hidden"><Image src="/images/logo1.png" fill alt="logo"/></div>
    <h2 className="text-white text-2xl font-sans font-semibold">Welcome back </h2>
    <h2 className="text-white text-md font-semibold font-sans">Login to <span className="text-green-500 font-bold text-xl font-sans">Spotify</span></h2>
    <form className="w-full px-8 flex items-center justify-center flex-col gap-4">

<div className="w-full flex items-start justify-center flex-col gap-2">
<label className="font-semibold text-md font-sans text-white">Email</label>
 <input type="email" placeholder="Enter your email" className="text-neutral-400 px-4 py-2 w-full h-[6vh] focus:outline-none bg-transparent border border-neutral-400 rounded-lg" value={formValues.email} onChange={(e)=>setFormValues({...formValues,email:e.target.value})}/>
</div>
<div className="w-full flex items-start justify-center flex-col gap-2">
<label className="font-semibold text-md font-sans text-white">Password</label>
 <input type="password" placeholder="Password" className="text-neutral-400 px-4 py-2 w-full h-[6vh] focus:outline-none bg-transparent border border-neutral-400 rounded-lg" value={formValues.password} onChange={(e)=>setFormValues({...formValues,password:e.target.value})}/>
</div>
<Button className="bg-green-500 py-2 px-8 flex items-center justify-center font-semibold text-white rounded-md outline-none border-none absolute bottom-8" onClick={handleLoginAccount} loading={loading}>Login</Button>
    </form>
  </div>
  </div>:null}
 </div>
  )
}

export default LoginForm