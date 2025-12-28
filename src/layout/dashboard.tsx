import { Outlet } from 'react-router'
import { Button } from '@/components/ui/button'
import '@/layout/styles/main.css'
import { Bell } from 'lucide-react'
import { Sidebar } from './sidebar'

export const Dashboard = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
          <div className="flex items-center gap-3 ml-6">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-50"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full" />
            </Button>
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}