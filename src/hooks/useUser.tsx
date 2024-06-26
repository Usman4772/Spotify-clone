"use client"
import { GlobalContext } from '@/components';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
function useUser() {
    const [user,setUser]=useState<any>()
    const {checkUser}=useContext(GlobalContext)
    async function getUser(){
        const res=await axios.get("/api/checkuser")
        if(res.data.user){
            setUser(res.data.user)
        }else{
            setUser(null)
        }
    }
useEffect(()=>{
getUser()
},[checkUser])
  return (
{user}
  )
}

export default useUser