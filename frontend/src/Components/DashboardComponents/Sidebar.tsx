import { Home, User } from "lucide-react";
import { Button } from "../ui/button"

export default function Sidebar() {
  return (
    <div className="w-[25vw] h-screen flex justify-end top-10">
        <div className=" py-2 gap-8  flex flex-col ml-auto text-white text-xl">
        <Button variant='default' className="flex items-center mr-3"><Home /> Home</Button>
        <Button variant='default' className="flex items-center border mr-3"><User /> Account</Button>

        </div>
    </div>
  )
}
