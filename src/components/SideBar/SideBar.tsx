"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import {SideBarItem,Library,Box} from "@/components"
interface SidebarProps{
    children:React.ReactNode
}

function SideBar({children}:SidebarProps) {
    const pathname=usePathname()
const routes=useMemo(()=>{
    return [
        {
            icon:HiHome,
            label:"Home",
            href:'/',
            active:pathname==="/"
        },
        {
            icon:BiSearch,
            label:"Search",
            href:"/search",
            active:pathname=="/search"
        }
    ]
},[pathname])


  return (
    <main className="w-screen min-h-screen flex items-start justify-between  gap-2">
  <div className=" hidden md:block w-[23%] min-h-full ">
    <div className="sticky left-0 top-0 w-full flex flex-col gap-2">
             <Box>
                <div className="w-full h-full flex items-start justify-center gap-4 flex-col">
                    {routes.map(route=>{
                        return <SideBarItem key={route.label} {...route}/>
                    })}
                </div>
             </Box>
             <Box className='h-[63vh]'>
                <Library/>
                </Box>
    </div>
    </div>

<div className="md:w-[78%] w-full">
    {children}
</div>
    </main>

  )
}

export default SideBar