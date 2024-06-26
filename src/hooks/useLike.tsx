"use client"
import { GlobalContext } from "@/components"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
function useLike(songId:any) {
    console.log(songId)
    const [like,setLike]=useState<boolean>(false)
    const {checkLike}=useContext(GlobalContext)
    async function checkLikeInDb(){
const res=await axios.get(`/api/check-like/${songId}`)
setLike(res.data.isPresent)
    }
    useEffect(()=>{
        if(!songId)return
        checkLikeInDb()
    },[checkLike,songId])
  return (
   {like}
  )
}

export default useLike