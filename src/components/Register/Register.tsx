"use client"
import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react"
import { GlobalContext,Button,MdOutlineCancel,TiUploadOutline } from "@/components";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
function RegisterForm() {
  const {openRegisterModel,setOpenRegisterModel,setIsLoggedOut}=useContext(GlobalContext)
  const [profileImage,setProfileImage]=useState<File | null>()
  const [loading,setLoading]=useState<boolean>(false)
  const fileInputRef=useRef<any>(null)
  const [formValues,setFormValues]=useState({
    username:"",
    email:"",
    password:""
  })

  function handleOnChange(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files){
      setProfileImage(e.target.files[0])
    }
  }
  
  function selectFile(){
    fileInputRef.current?.click()
  }
function validate(){
  const {username,email,password}=formValues
  if(username!=="" && email !=="" && password!=="" && profileImage!==undefined)return true
  return false
}
  async function handleRegisterAccount(e:FormEvent){
    e.preventDefault()
 try {
   const isValidate=validate()
   if(!isValidate)return toast.error("Please fill out all the fileds")
  setLoading(true)
const formData=new FormData()
formData.append("username",formValues.username)
formData.append("email",formValues.email)
formData.append("password",formValues.password)
if(profileImage){formData.append("profileImage",profileImage)}
const res=await axios.post("/api/register",formData)
if(res.data.Message==="duplicate"){
  toast.error("This email is already taken!")
  formValues.email=""
  setLoading(false)
  return
}
setLoading(false)
setOpenRegisterModel(false)
setIsLoggedOut(false)
formValues.email=""
formValues.username=""
formValues.password=""
 } catch (error) {
 toast.error("Something went wrong")
 }   



  }

  return (
 <div>
   {openRegisterModel?<div className="w-screen h-screen text-center  flex items-center justify-center register absolute z-50 ">
  <div className="w-[400px] h-[500px] bg-black rounded-lg flex flex-col gap-4 items-center justify-center  relative">
<MdOutlineCancel className="absolute top-4 right-4 text-white text-xl cursor-pointer" onClick={()=>setOpenRegisterModel(false)}/>
<div className="w-[5rem] h-[5rem] rounded-full relative overflow-hidden"><Image src="/images/logo1.png" fill alt="logo"/></div>
    <h2 className="text-white text-md font-semibold font-sans">Register your account to <span className="text-green-500 font-bold text-xl font-sans">Spotify</span></h2>
    <form className="w-full px-8 flex items-center justify-center flex-col gap-4">
<div className="w-full flex items-start justify-center flex-col gap-2">
<label className="font-semibold text-md font-sans text-white">Username</label>
 <input type="text" placeholder="Username" className="text-white px-4 py-2 w-full h-[6vh] focus:outline-none bg-transparent border border-neutral-400 rounded-lg" value={formValues.username} onChange={(e)=>setFormValues({...formValues,username:e.target.value})}/>
</div>
<div className="w-full flex items-start justify-center flex-col gap-2">
<label className="font-semibold text-md font-sans text-white">Email</label>
 <input type="email" placeholder="Enter your email" className="text-white px-4 py-2 w-full h-[6vh] focus:outline-none bg-transparent border border-neutral-400 rounded-lg" value={formValues.email} onChange={(e)=>setFormValues({...formValues,email:e.target.value})}/>
</div>
<div className="w-full flex items-start justify-center flex-col gap-2">
<label className="font-semibold text-md font-sans text-white">Password</label>
 <input type="password" placeholder="Password" className="text-white px-4 py-2 w-full h-[6vh] focus:outline-none bg-transparent border border-neutral-400 rounded-lg" value={formValues.password} onChange={(e)=>setFormValues({...formValues,password:e.target.value})}/>
</div>
<div>
<input type='file' name="profileImage" onChange={handleOnChange} hidden ref={fileInputRef} accept="image/jpg,image/jpeg,image/avif" required/>
<Button icon={<TiUploadOutline />} onClick={selectFile} className="px-12 py-2 flex items-center justify-center bg-black text-white borrder border-neutral-400 outline-none"> Profile Image</Button>
</div>
<Button className="bg-green-500 py-2 px-8 flex items-center justify-center font-semibold text-white rounded-md outline-none border-none" onClick={handleRegisterAccount} loading={loading}>Register</Button>
    </form>
  </div>
  </div>:null}
 </div>
  )
}

export default RegisterForm