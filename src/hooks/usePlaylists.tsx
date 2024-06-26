"use client"

import axios from "axios"
import { useEffect, useState } from "react"

function usePlaylists() {
    const [playlists,setPlaylists]=useState<Array<object>| []>([])
    async function fetchPlaylists(){
const res=await axios.get("/api/get-playlists")
console.log(res.data)
    }
    useEffect(()=>{
        fetchPlaylists()
    },[])
  return (
    {playlists}
  )
}

export default usePlaylists