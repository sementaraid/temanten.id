import { motion } from "motion/react"
import { Link } from "react-router"

export const Navbar = () => {
  return (
    <nav className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold text-gray-900"
        >
          Temanten<span className="text-emerald-600">.id</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-8 text-sm text-gray-600"
        >
          {window.__AUTH__.isLoggedIn && (
            <Link to="/dashboard">Dashboard</Link>
          )}
          {!window.__AUTH__.isLoggedIn && (
            <>
              <Link to="/sign-in" className="hover:text-gray-900 transition-colors">Sign In</Link>
              <Link to="/sign-up" className="hover:text-gray-900 transition-colors">Sign Up</Link>
            </>
          )}
        </motion.div>
      </div>
    </nav>
  )
}