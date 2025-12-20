import { motion, useInView } from 'motion/react'
import { useTemantenState } from '@/context'
import { useRef } from 'react'

export const Brides = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { screenState } = useTemantenState()
  const isInView = useInView(ref, { once: true })

  const isActive = screenState === 'main'
  const shouldAnimate = isActive && isInView

  const containerVariants = {
    hidden: {},
    enter: {
      transition: { staggerChildren: 0.36, delayChildren: 0.18 },
    },
  }

  const itemVariants = {
    hidden: { y: -12, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 2 } },
    exit: { y: -8, opacity: 0, transition: { duration: 2 } },
  }

  return (
    <section
      id="brides-section"
      className="min-h-screen relative overflow-x-hidden flex flex-col justify-center items-center px-4 overflow-hidden"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? 'enter' : 'hidden'}
        className="mb-2 mt-16 w-full"
      >
        <div className="space-y-8 text-center">
          <motion.h2
            variants={itemVariants}
            className="font-arashveti text-3xl font-bold text-[#a85200]"
          >
            Kami yang berbahagia
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-open-sans text-xs text-gray-700 leading-relaxed"
          >
            Berbekal niat suci dan atas izin Allah SWT, dengan kerendahan hati,
            kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada acara
            pernikahan kami :
          </motion.p>
        </div>

        <div className="text-center mt-8 px-4 space-y-2">
          <motion.h3 variants={itemVariants} className="font-serif text-2xl">
            TRI MARTA PUTRI HARDIYANTI
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="font-open-sans text-xs text-gray-700"
          >
            Putri ketiga dari
            <br />
            <strong>Bapak Suhardi & Ibu Puji Astuti</strong>
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-open-sans text-xs text-gray-700 -xs my-6"
          >
            dengan
          </motion.p>
          <motion.h3
            variants={itemVariants}
            className="font-serif text-2xl mt-4"
          >
            HERLINA SUNARYANTO
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="font-open-sans text-xs text-gray-700"
          >
            Putra pertama dari
            <br />
            <strong>Bapak Sukamta & Ibu Suminarsih</strong>
          </motion.p>
        </div>
      </motion.div>

      <img
        src="/images/sinta.png"
        alt="Sinta"
        className="pointer-events-none w-full h-auto absolute -bottom-4 -left-50 select-none opacity-20 blur transform -rotate-[20deg] -scale-x-100 "
        aria-hidden="true"
      />
      <img
        src="/images/rama.png"
        alt="Rama"
        className="pointer-events-none w-full h-auto absolute -bottom-4 -right-30 select-none opacity-20 blur"
        aria-hidden="true"
      />
      <img
        src="/images/awan.png"
        alt="Awan Decoration"
        className="pointer-events-none w-full h-auto absolute -top-2 transform -scale-y-100 "
      />
      <img
        src="/images/awan.png"
        alt="Awan Decoration"
        className="pointer-events-none w-full h-auto absolute -bottom-24"
      />
    </section>
  )
}
