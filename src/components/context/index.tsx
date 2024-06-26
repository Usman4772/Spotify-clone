"use client"
import { createContext, useState } from "react";
import { GlobalContextProps } from "@/lib/types";
export const GlobalContext=createContext<any>(null)

export default function GlobalContextWrappper({children}:GlobalContextProps){
    const [openRegisterModel,setOpenRegisterModel]=useState(false)
    const [openLoginModel,setOpenLoginModel]=useState(false)
    const [isLoggedIn,setIsLoggedIn]=useState<boolean>(false)
    const [openSongsModel,setOpenSongsModel]=useState<boolean>(false)
    const [allSongs,setAllSongs]=useState<Array<object>>([])
    const [favSongs,setFavSongs]=useState<Array<object> | []>([])
    const [user,setUser]=useState()
    const [isLoggedOut,setIsLoggedOut]=useState<boolean>(false)
    const [searchedSongs,setSearchedSongs]=useState<Array<object> | []>([])
    const [searchedLoading,setSearchedLoading]=useState<boolean>(false)
    const [checkUser,setCheckUser]=useState<boolean>(false)
    const [checkLike,setCheckLike]=useState<boolean>(false)
    const [currentSongIndex,setCurrentSongIndex]=useState<number>(0)
    const [songCategory,setSongCategory]=useState<string>("all")
    const [showPlaylsitForm,setShowPlaylsitForm]=useState<boolean>(false)
    const [playlists,setPlaylists]=useState<Array<object> | []>([])
    
return <GlobalContext.Provider value={{openRegisterModel,setOpenRegisterModel,openLoginModel,setOpenLoginModel,isLoggedIn,setIsLoggedIn,user,setUser,openSongsModel,setOpenSongsModel,allSongs,setAllSongs,isLoggedOut,setIsLoggedOut,searchedSongs,setSearchedSongs,searchedLoading,setSearchedLoading,checkUser,setCheckUser,checkLike,setCheckLike,currentSongIndex,setCurrentSongIndex,songCategory,setSongCategory,favSongs,setFavSongs,showPlaylsitForm,setShowPlaylsitForm,playlists,setPlaylists}}>{children}</GlobalContext.Provider>
}