import { Mail, Github, Linkedin } from "lucide-react"
import { motion } from "motion/react"

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="border-t border-gray-100 py-8"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>&copy; 2025 Temanten.id. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-900 transition-colors">
            <Mail size={20} />
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}