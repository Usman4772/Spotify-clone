"use client"
import { GlobalContext, Header ,SearchHeader, SongItem} from "@/components"
import { Spin } from "antd"
import { useContext } from "react"
import { LoadingOutlined } from '@ant-design/icons';
function Search() {
  const {searchedSongs,searchedLoading}=useContext(GlobalContext)
  return (
    <div className="bg-bg rounded-lg w-full h-[84.4vh]  overflow-y-scroll overflow-x-hidden ">
  <Header><SearchHeader/></Header>
{searchedLoading? <div className="w-full h-[70%]  flex items-center justify-center"><Spin indicator={<LoadingOutlined spin/>} /></div>:<div className="w-full h-[70%]  flex items-start justify-start p-4 flex-wrap gap-4">
    {searchedSongs && searchedSongs.length>0 ? searchedSongs.map((song:object,i:number)=>{
      return <SongItem data={song} key={i}/>

    }):<div className="w-full h-full flex items-center justify-center text-white font-bold text-xl ">No search results found</div>}
  </div>}
  
    </div>
  )
}

export default Search