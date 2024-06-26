import { twMerge } from "tailwind-merge"
interface BoxProps{
    children:React.ReactNode
className?:string
}

function Box({children,className}:BoxProps) {
  return (
    <div className={twMerge(`w-full h-[20vh] bg-bg p-4 rounded-lg`,className) }>
{children}
    </div>
  )
}

export default Box