"use client"
import Image from 'next/image';
import { useState,useContext, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { GlobalContext } from '../context';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import {  useUser } from '..';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { SongProps } from '@/lib/types';

function Player() {
    const path=usePathname()
    const {currentSongIndex,setCurrentSongIndex,checkLike,setCheckUser,setCheckLike,openSongsModel}=useContext(GlobalContext)
    const [isLiked,setIsLiked]=useState<boolean>(false)
    const [songs,setSongs]=useState<Array<SongProps>|[]>([])
    const [loading,setLoading]=useState<boolean>(false)
    const {user}=useUser()
    const Icon=isLiked?FaHeart:FaRegHeart
// console.log(isLiked)


    function playNext(){
      if(currentSongIndex<songs.length-1){
           setCurrentSongIndex((prev:number)=>prev+1)
      }else{
              setCurrentSongIndex(0)
      }
       
    }
    function playPrevious(){
      if(currentSongIndex>0){

        setCurrentSongIndex((prev:number)=>prev-1)
      }else{
        setCurrentSongIndex(songs.length-1)
      }
    }
   async function getAllSongs(){
  setLoading(true)
const res=await axios.get("/api/allsongs")
if(res.status==200){
  
  setSongs(res.data)
  setLoading(false)
  
}
setLoading(false)
    }
async function getFavSongs(){
  const res=await axios.get("/api/get-fav")
  if(res.data.Message=="success"){
    // console.log(res.data.user.liked_songs)
    setSongs(res.data.user.liked_songs)
  }else{
getAllSongs()
  }
}


async function checkLikes(){
  try {
    console.log(songs[currentSongIndex]._id)
    const res=await axios.get(`/api/check-like/${songs[currentSongIndex]._id}`)
    setIsLiked(res.data.isPresent)
  } catch (error) {
    console.log(error)
  }

 
}
    useEffect(()=>{
  
      if(path=="/"){
      
          getAllSongs()
      }else if(path=="/likedsongs"){
       getFavSongs()
      }
    },[path,checkLike])
    useEffect(()=>{
     
getAllSongs()
checkLikes()
    },[openSongsModel])
    useEffect(()=>{
      if(songs.length>0){
        checkLikes()
      }
    },[songs,checkLike,currentSongIndex,checkLike])

    async function handleAddToLikes(){
    
      setCheckUser((prev:any)=>!prev)
      setCheckLike((prev:any)=>!prev)
      if(!user)return toast.error("Please Loggin first!")
      const res=await axios.get(`/api/add-to-likes/${songs[currentSongIndex]._id}`)
      // console.log(res.data)
    }



  if(songs.length<=0)return
  return (
    <div className='absolute bottom-0 w-full'>
          <AudioPlayer    
              className='relative'
    autoPlay
    src={songs[currentSongIndex]?.song_path}
    // onPlay={e => console.log("onPlay")}
    showSkipControls
    showFilledVolume
    onClickNext={playNext}
    onClickPrevious={playPrevious}
    customAdditionalControls={[<div className='flex items-center justify-start gap-4  w-[20%] h-full absolute left-12 '><div className='w-[40px] h-[38px] relative rounded-md'><Image src={songs[currentSongIndex]?.songCover} fill alt='cover' className='objec-cover rounded-md'/></div><div className='flex flex-col w-[50%]'><h2 className='font-semibold text-white truncate h-[25px] '>{songs[currentSongIndex]?.title}</h2><p className='text-sm text-neutral-400  truncate'>{songs[currentSongIndex].author}</p></div><div onClick={handleAddToLikes}><Icon className={isLiked?"text-green-500 cursor-pointer text-xl":"text-white cursor-pointer text-xl"}/></div></div>]}
  />
    </div>
  ) 
}

export default Player