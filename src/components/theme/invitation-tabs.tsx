import { MessageCircle, Settings, Users } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router"
import { cn } from "@/lib/utils";
import { motion } from "motion/react";


export const NavigationTabs = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname
  const tabs = [
    { id: 'my-invitations/builder', name: 'Builder', icon: Settings, description: 'Edit invitation design' },
    { id: 'my-invitations/guests', name: 'Guest List', icon: Users, description: 'Manage your guests' },
    { id: 'my-invitations/guests-messages', name: 'Messages', icon: MessageCircle, description: 'View guest wishes' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Link
                key={tab.id}
                to={`/${tab.id}`}
                onClick={() => navigate(`/${tab.id}`)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative",
                  pathname === `/${tab.id}`
                    ? "text-emerald-600"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Icon size={16} />
                {tab.name}
                {pathname === `/${tab.id}` && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>
  )
}