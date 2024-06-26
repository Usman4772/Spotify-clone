import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge"
import Link from "next/link"
interface SideBarItemsProps{
    icon:IconType,
    label:string,
    href:string,
    active?:boolean
}
function SideBarItem({
    icon:Icon,
    label,
    href,
    active
}:SideBarItemsProps) {
  return (
    <Link  href={href} className={twMerge("w-full text-neutral-400  flex items-center justify-start gap-4 px-4 font-semibold ",active && "text-white font-bold")}>
    <div><Icon/></div>
    <div>{label}</div>
</Link>
  )
}

export default SideBarItem