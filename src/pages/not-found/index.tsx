import { motion } from 'motion/react'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/theme/button'

export default function NotFound() {
  const handleGoHome = () => window.location.href = '/'
  const handleGoBack = () => window.history.back()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="inline-block">
              <span className="text-sm font-medium text-red-600 border border-red-200 bg-red-50 px-4 py-2 rounded-full">
                Page Not Found
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl font-bold text-gray-900">
              <span className="text-red-600">404</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The page you're looking for doesn't exist.
            </p>
            <p className="text-gray-500">
              Let's get you back on track.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center pt-4 items-center"
          >
            <Button
              onClick={handleGoHome}
            >
              <Home size={18} />
              Go Home
            </Button>
            <Button 
              variant={'outline'}
              onClick={handleGoBack}
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="border-t border-gray-100 py-8"
      >
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>&copy; 2025 Temanten.id. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}