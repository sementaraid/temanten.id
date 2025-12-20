import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'motion/react'
import { useRef, useState } from 'react'

// Mock context - replace with your actual context
const useTemantenState = () => ({
  screenState: 'main',
})

interface Comment {
  id: string
  name: string
  message: string
  timestamp: Date
}

export function Comments() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { screenState } = useTemantenState()
  const isInView = useInView(ref, { once: true })

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Budi & Sari',
      message:
        'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
      timestamp: new Date(2024, 11, 10),
    },
    {
      id: '2',
      name: 'Dewi Kusuma',
      message:
        'Bahagia selalu untuk kalian berdua. Semoga lancar sampai hari H!',
      timestamp: new Date(2024, 11, 11),
    },
  ])

  const isActive = screenState === 'main' && isInView

  const containerVariants = {
    hidden: {},
    enter: {
      transition: { staggerChildren: 0.18, delayChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { y: -24, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 2 } },
  }

  const handleSubmit = () => {
    if (name.trim() && message.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date(),
      }
      setComments([newComment, ...comments])
      setName('')
      setMessage('')
    }
  }

  return (
    <section
      id="comments-section"
      className="min-h-screen relative overflow-x-hidden flex flex-col justify-center items-center px-4 overflow-hidden"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? 'enter' : 'hidden'}
      >
        {/* Header */}
        <div className="space-y-4 text-center mb-4">
          <motion.h2
            variants={itemVariants}
            className="font-arashveti text-3xl font-bold text-[#a85200]"
          >
            Doa dan Ucapan
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xs text-gray-700 font-open-sans"
          >
            Berikan doa dan ucapan terbaik untuk kedua mempelai
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div variants={itemVariants} className="mb-4">
          <Card className="border-[#a85200]/20 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-gray-700 font-open-sans"
                  >
                    Nama
                  </label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-[#a85200]/30 focus:border-[#a85200] focus:ring-[#a85200] text-xs font-open-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-medium text-gray-700"
                  >
                    Ucapan
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tulis doa dan ucapan Anda di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-[#a85200]/30 focus:border-[#a85200] focus:ring-[#a85200] min-h-[80px] resize-none text-xs font-open-sans"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  size={'sm'}
                  className="w-full bg-[#a85200] hover:bg-[#8a4500] text-white transition-colors text-xs"
                >
                  Kirim Ucapan
                </Button>
              </div>
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="enter"
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'px-0 py-4',
                    index !== comments.length - 1 &&
                      'border-b border-dashed border-[#a85200]/30',
                    index === comments.length - 1 && 'pb-0'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#a85200] text-base">
                      {comment.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-open-sans">
                      {comment.timestamp.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-open-sans">
                    {comment.message}
                  </p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      <img
        src="/images/awan.png"
        alt=""
        className="pointer-events-none w-full h-auto absolute -top-24 -scale-y-100"
        aria-hidden="true"
      />
    </section>
  )
}
