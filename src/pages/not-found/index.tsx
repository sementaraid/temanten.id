import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import '@/pages/not-found/styles/main.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="relative z-10 max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="border-red-500/20 bg-red-500/10 text-red-400 px-3 py-1 backdrop-blur-sm"
            >
              Page Not Found
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
              <span className="text-red-400">404</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              The page you're looking for doesn't exist.
              <br />
              <span className="text-slate-500">Let's get you back on track.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300 font-medium"
            >
              Go Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800/50 transition-all duration-300 font-medium"
            >
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}