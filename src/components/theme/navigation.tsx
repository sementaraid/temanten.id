import { ArrowLeft, Eye, MessageCircle, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

type TabType = 'builder' | 'guests' | 'messages'
type NavigationProps = {
  // You can add props here if needed in the future
  previousUrl: string,
  title: string,
  subTitle: string,
  RightSection?: ReactNode
  BellowSection?: ReactNode
}

export const Navigation = ({ previousUrl, title, subTitle, RightSection, BellowSection }: NavigationProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('builder')

  const tabs = [
    { id: 'builder', name: 'Builder', icon: Settings, description: 'Edit invitation design' },
    { id: 'guests', name: 'Guest List', icon: Users, description: 'Manage your guests' },
    { id: 'messages', name: 'Messages', icon: MessageCircle, description: 'View guest wishes' },
  ]

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(previousUrl)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{title}</h1>
              <p className="text-xs text-gray-500">{subTitle}</p>
            </div>
          </div>
          {RightSection && (
            <>
              {RightSection}
            </>
          )}

        </div>
      </div>
      {/* Tabs */}
      {BellowSection && (
        <>
          {BellowSection}
        </>
      )}
      {/* <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative",
                  activeTab === tab.id
                    ? "text-emerald-600"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Icon size={16} />
                {tab.name}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div> */}
    </div>
  )
}