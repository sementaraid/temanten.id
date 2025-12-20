import { Separator } from '@/components/ui/separator'
import { motion, useInView } from 'motion/react'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer'
import { DebitCard } from '../features/debit-card'
import { CopyableText } from '../features/copyable-text'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

type TimelineEntry = {
  date: string
  title: string
  content: string
}

const timelineData: TimelineEntry[] = [
  {
    date: '19 Januari 2025',
    title: 'Pertemuan Pertama',
    content:
      'Pertemuan pertama yang tidak pernah disangka akan terjadi melalui rekan sejawat tanpa disangka menjadi cerita kami',
  },
  {
    date: '26 Juni 2026',
    title: 'Komitmen Awal',
    content:
      'Setelah menjalani hubungan jarak jauh selama setahun dan menemukan kecocokan akhirnya kami memutuskan untuk menjalin hubungan ke jenjang yang lebih serius.',
  },
  {
    date: '26 Juli 2026',
    title: 'Pernikahan',
    content:
      'Kami melangsungkan pernikahan di akhir bulan Juli 2026 sebagai langkah untuk membawa hubungan ini ke jenjang yang lebih serius untuk hidup dan menua bersama.',
  },
]

const LoveStory = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [open, setOpen] = useState(false)

  const containerVariants = {
    hidden: {},
    enter: {
      transition: { staggerChildren: 0.18, delayChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { y: -24, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  const lineVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
  }

  return (
    <>
      <section
        id="timeline-section"
        className="min-h-screen relative overflow-x-hidden flex flex-col justify-center items-center px-4 overflow-hidden"
      >
        <div ref={ref} className="container max-w-4xl">
          <motion.h1
            className="font-arashveti text-3xl font-bold text-center mb-6 text-[#a85200]"
            initial={'hidden'}
            animate={isInView ? 'enter' : 'hidden'}
            transition={{ duration: 0.6 }}
          >
            Kisah Kami
          </motion.h1>

          {/* Timeline */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'enter' : 'hidden'}
          >
            {/* Vertical Line */}
            <motion.div variants={lineVariants}>
              <Separator
                orientation="vertical"
                className="bg-[#a85200] absolute left-2 top-0 bottom-0 h-full"
              />
            </motion.div>

            {/* Timeline Items */}
            <div className="space-y-6">
              {timelineData.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8"
                  variants={itemVariants}
                >
                  <h4 className="font-serif text-lg text-gray-900 mb-1">
                    {milestone.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-700">
                      {milestone.date}
                    </span>
                  </div>
                  <p className="font-open-sans text-xs text-gray-700 leading-relaxed">
                    {milestone.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={'hidden'}
            animate={isInView ? 'enter' : 'hidden'}
            variants={containerVariants}
          >
            <p className="font-open-sans text-xs mb-8 text-gray-700 leading-relaxed">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
              Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat
              memberi kado secara cashless.
            </p>
          </motion.div>

          <motion.div
            className="space-y-1 text-center"
            initial={'hidden'}
            animate={isInView ? 'enter' : 'hidden'}
            variants={itemVariants}
          >
            <Button
              onClick={() => setOpen(true)}
              size={'sm'}
              className="w-[250px] bg-[#a85200] hover:bg-[#8a4500] text-white transition-colors text-xs"
            >
              Kirim Hadiah
            </Button>
          </motion.div>
        </div>

        <img
          src="/images/awan.png"
          alt="Awan Decoration"
          className="pointer-events-none w-full h-auto absolute -top-24 transform -scale-y-100 "
        />
        <img
          src="/images/awan.png"
          alt="Awan Decoration"
          className="pointer-events-none w-full h-auto absolute -bottom-24"
        />
      </section>
      <Drawer open={open} onOpenChange={() => setOpen(!open)}>
        <DrawerContent className="p-0">
          <VisuallyHidden>
            <DrawerTitle />
            <DrawerDescription />
          </VisuallyHidden>
          <div className="p-4 space-y-4">
            <DebitCard />
            <CopyableText
              text="8530593135"
              label="TRI MARTA PUTRI HARDIYANTI"
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export { LoveStory }
