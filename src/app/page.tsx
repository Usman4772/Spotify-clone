"use client"
import { GlobalContext, Header,SongItem } from "@/components"
import HeaderContent from "@/components/Header/HeaderContent"
import axios from "axios"
import { useContext, useEffect } from "react"
function Home() {
  const {allSongs,setAllSongs,openSongsModel}=useContext(GlobalContext)
  async function getAllSongs(){
    try {

      const res=await axios.get("/api/allsongs")
      if(res.status==200){
setAllSongs(res.data)

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllSongs()
  },[openSongsModel])
  useEffect(()=>{getAllSongs()},[])
  return (
    <div className='bg-bg rounded-lg w-full h-[84.4vh]  overflow-y-scroll overflow-x-hidden '>
     <Header><HeaderContent/></Header>
      <h2 className='font-semibold text-white text-md px-4 mt-4 '>Newest Songs</h2>
      <div className="w-full h-full overflow-y-scroll flex items-start justify-start px-1 py-4 gap-4 flex-wrap">
    {allSongs && allSongs.length>0 ? allSongs.map((song:object,i:number)=>{
return <SongItem key={i} data={song} index={i}/>
    }):<div className="w-full h-[70%] flex items-center justify-center text-white text-xl font-bold">No Songs Found</div>}
      </div>
    </div>
  )
}
export default Home