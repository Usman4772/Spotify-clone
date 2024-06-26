"use client"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context"
function SearchInput() {
    const [searchValue,setSearchValue]=useState<string>("")
    const {setSearchedSongs,setSearchedLoading}=useContext(GlobalContext)
    
async function handleSearch(){
try {
  if(searchValue===""){
    setSearchedSongs([])
    return
  }
  const title=new FormData()
  title.append("title",searchValue)
  setSearchedLoading(true)
const res=await axios.post("/api/search",title)
if(res.status==200){
  setSearchedSongs(res.data)
  setSearchedLoading(false)
}
} catch (error) {
  console.log(error)
  setSearchedLoading(false)
}
}
    useEffect(()=>{
setTimeout(()=>{

  handleSearch()
},1500)
    },[searchValue])
  return (
<div className="w-full flex items-center justify-center py-4">
<input type="text" placeholder="What you want to listen to ..." value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}  className="w-[80%]  h-[8vh] bg-neutral-700 px-4 py-2 rounded-md focus:outline-none text-white font-semibold text-md "/>
</div>
  )
}

export default SearchInput