import { motion } from 'motion/react'
import { Button } from '@/components/theme/button'
import { Input } from '@/components/ui/input'

export default function App() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="inline-block">
            <span className="text-sm font-medium text-emerald-600 border border-emerald-200 bg-emerald-50 px-4 py-2 rounded-full">
              Coming Soon
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
            Something beautiful<br />is being crafted
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto"
        >
          We're working on a new experience. Stay tuned for updates and be among the first to know when we launch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-[300px] border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 transition-colors"
          />
          <Button>
            Notify Me
          </Button>
        </motion.div>
      </div>
    </div>
  )
}