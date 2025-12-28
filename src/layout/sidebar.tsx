import { Button, buttonVariants } from "@/components/theme/button"
import { cn } from "@/lib/utils"
import { X, Menu, LogOut, BarChart3, Heart, LayoutDashboard, Palette, Settings, Share2, UserCheck, Users, Image } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { Link } from "react-router"

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true, href: '/dashboard' },
    { icon: Heart, label: 'Invitations', href: '/invitations' },
    { icon: Palette, label: 'Templates', href: '/templates' },
    { icon: Users, label: 'Customers', href: '/customers' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ]

  const customerMenuItems = [
    { icon: Heart, label: 'My Invitation' },
    { icon: Users, label: 'Guest List' },
    { icon: UserCheck, label: 'RSVP Responses' },
    { icon: Palette, label: 'Customize' },
    { icon: Share2, label: 'Share' },
    { icon: Image, label: 'Gallery' },
  ]

  const shouldRenderAdminMenus = window.__AUTH__.user.role === 'admin'
  const shouldRenderUserMenus = window.__AUTH__.user.role === 'user'
  

  return (
    <motion.div
      animate={{ width: sidebarOpen ? 240 : 80 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <motion.div
          animate={{
            opacity: sidebarOpen ? 1 : 0,
            width: sidebarOpen ? 'auto' : 0,
            display: sidebarOpen ? 'block' : 'none'
          }}
          transition={{ duration: 0.3 }}
          className="font-semibold text-gray-900 overflow-hidden whitespace-nowrap"
        >
          Temanten<span className="text-emerald-600">.id</span>
        </motion.div>
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="link"
          className="hover:bg-gray-50"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {shouldRenderAdminMenus && adminMenuItems.map((item) => (
          <motion.div
            key={item.label}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={item.href ?? '#'}
              className={cn(
                buttonVariants({
                  variant: item.active ? "default" : "ghost"
                }),
                "w-full justify-start",
                sidebarOpen ? "px-4 py-3" : "px-0 py-3 justify-center",
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <motion.span
                animate={{
                  opacity: sidebarOpen ? 1 : 0,
                  width: sidebarOpen ? 'auto' : 0,
                  display: sidebarOpen ? 'block' : 'none'
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.div>
        ))}

        {shouldRenderUserMenus && customerMenuItems.map((item) => (
          <motion.div
            key={item.label}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant={"ghost"}
              className={cn(
                "w-full justify-start",
                sidebarOpen ? "px-4 py-3" : "px-0 py-3 justify-center",
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <motion.span
                animate={{ opacity: sidebarOpen ? 1 : 0, width: sidebarOpen ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </Button>
          </motion.div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <motion.div
          transition={{ duration: 0.2 }}
        >
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-start",
              sidebarOpen ? "px-4 py-3" : "px-0 py-3 justify-center",
            )}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <motion.span
              animate={{
                opacity: sidebarOpen ? 1 : 0,
                width: sidebarOpen ? 'auto' : 0,
                display: sidebarOpen ? 'block' : 'none'
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden whitespace-nowrap"
            >
              Logout
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}