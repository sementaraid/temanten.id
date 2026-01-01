import { motion, AnimatePresence } from 'motion/react'
import { Heart, Home, Plus, Users, BarChart3, Settings, LogOut, Menu, X, Bell, User, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  userRole?: 'customer' | 'admin'
}

// Sidebar Content Component
interface SidebarContentProps {
  navItems: Array<{
    id: string
    label: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    href: string
  }>
  currentPage: string
  userRole: 'customer' | 'admin'
  collapsed: boolean
  onClose?: () => void
}

const SidebarContent = ({ navItems, currentPage, userRole, collapsed, onClose }: SidebarContentProps) => {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col">
      {/* Logo Section */}
      <div className={cn(
        "border-b border-gray-200 flex items-center gap-3",
        collapsed ? "h-[72px] justify-center px-4" : "h-16 px-6"
      )}>
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
          <Heart size={16} className="text-white" />
        </div>
        {!collapsed && (
          <>
            <h1 className="font-semibold text-gray-900 whitespace-nowrap">
              Temanten<span className="text-emerald-600">.id</span>
            </h1>
            {userRole === 'admin' && (
              <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                Admin
              </span>
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 overflow-y-auto py-4", collapsed ? "px-3" : "px-4")}>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.href)
                onClose?.()
              }}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-all",
                collapsed ? "px-3 py-3 justify-center" : "px-3 py-2.5",
                currentPage === item.id
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className={cn(
        "border-t border-gray-200",
        collapsed ? "p-3" : "p-4"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john@example.com</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-600 mt-3"
            size="sm"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        )}

        {collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="w-full mt-2"
            title="Sign Out"
          >
            <LogOut size={18} className="text-gray-600" />
          </Button>
        )}
      </div>
    </div>
  )
}

export const DashboardLayout = ({
  userRole = 'customer'
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const customerNavItems = [
    { id: 'dashboard', label: 'My Invitations', icon: Home, href: '/my-invitations/list' },
    { id: 'create', label: 'Create New', icon: Plus, href: '/create' },
    { id: 'guests', label: 'Guest List', icon: Users, href: '/guests' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ]

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/admin' },
    { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
    { id: 'invitations', label: 'All Invitations', icon: Heart, href: '/admin/invitations' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
  ]

  const navItems = userRole === 'admin' ? adminNavItems : customerNavItems

  const location = useLocation()
  const currentPage = location.pathname.split('/')[1] || 'dashboard'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Heart size={16} className="text-white" />
            </div>
            <h1 className="font-semibold text-gray-900">
              Temanten<span className="text-emerald-600">.id</span>
            </h1>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full"></span>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 lg:hidden"
            >
              <SidebarContent
                navItems={navItems}
                currentPage={currentPage}
                userRole={userRole}
                collapsed={false}
                onClose={() => setMobileMenuOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <motion.div
          animate={{ width: sidebarOpen ? 256 : 72 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed top-0 left-0 bottom-0 bg-white border-r border-gray-200 z-30"
        >
          <SidebarContent
            navItems={navItems}
            currentPage={currentPage}
            userRole={userRole}
            collapsed={!sidebarOpen}
          />

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft
              size={14}
              className={cn(
                "text-gray-600 transition-transform",
                !sidebarOpen && "rotate-180"
              )}
            />
          </button>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-200",
        sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]"
      )}>
        <Outlet />
      </div>
    </div>
  )
}
