import { MessageSquare } from "lucide-react";

export default function DashBoard() {
  return (
    <div>
    
     <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-orange-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-orange-600" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-gray-900">askQ</span>
          </div>
          <div className="hidden md:flex items-center gap-8">

          </div>
          <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-orange-700 transition-colors">
            Get Started
          </button>
        </nav>
      </header>

    </div>
  )
}
