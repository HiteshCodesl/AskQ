import { MessageSquare } from "lucide-react";
import { Input } from "../ui/input";
import Sidebar from "./Sidebar";
import QuestionCard from "./QuestionCard";

export default function DashBoard() {
  return (
    <div className="min-h-screen w-full flex flex-col">
    
     <div className="Child fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-orange-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-orange-600" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-gray-900">askQ</span>
          </div>
          <div className="flex items-center gap-8">
              <Input className="w-[50vw] md:w-[45vw] text-sm md:text-md"  placeholder="Search Questions"/>
          </div>
          <button className="hidden md:flex bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-orange-700 transition-colors">
            Ask Question
          </button>
        </nav>
      </div>

      <div className="Child flex flex-row pt-20 h-screen">

        <div className="hidden md:flex flex-col w-[25vw] border-r">
          <Sidebar />
        </div>
        <div className=" md:w-[75vw] p-4 mx-auto">
          <QuestionCard />
        </div>

      </div>

    </div>
  )
}
