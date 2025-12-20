import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { motion, useInView } from 'motion/react'
import { useTemantenState } from '@/context'
import { useRef } from 'react'

export const CeremonyAfter = () => {
  const ref = useRef<HTMLElement | null>(null)
  const { screenState } = useTemantenState()
  const isInView = useInView(ref, { once: true })

  const isActive = screenState === 'main'
  const shouldAnimate = isActive && isInView

  const containerVariants = {
    hidden: {},
    enter: {
      transition: { staggerChildren: 0.18, delayChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { y: -24, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { y: -12, opacity: 0, transition: { duration: 0.35 } },
  }

  return (
    <section
      id="ceremony-section"
      className="min-h-screen relative overflow-x-hidden flex flex-col justify-center items-center px-4 overflow-hidden"
    >
      <motion.div
        ref={ref as any}
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? 'enter' : 'hidden'}
        className="mb-2 mt-4"
      >
        <div className="space-y-8 text-center">
          <motion.img
            src="/images/gunungan.png"
            className="w-20 h-auto m-auto"
            alt=""
            variants={itemVariants}
          />
          <motion.h2
            variants={itemVariants}
            className="font-arashveti text-3xl font-bold text-[#a85200]"
          >
            Resepsi
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-open-sans text-xs my-6 text-gray-700 font-open-sans"
          >
            Akan dilaksanakan pada :
          </motion.p>
        </div>

        <div className="text-center mt-8 px-4 space-y-2">
          <motion.h3 variants={itemVariants} className="font-serif text-2xl">
            MINGGU, 26 JULI 2026
          </motion.h3>
          <motion.h3 variants={itemVariants} className="font-serif text-2xl">
            13:00 WIB
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="font-open-sans text-xs my-6 text-gray-700 font-open-sans"
          >
            Bertempat di kediaman mempelai wanita
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-open-sans text-xs my-6 text-gray-700 font-open-sans font-semibold leading-relaxed"
          >
            Jl Sematang Perumahan Griya Harapan A Blok 1 No. 17 RT. 71 RW. 28
            Kel. Sako Kec. Sako Palembang
          </motion.p>
          <motion.div variants={itemVariants} className="space-y-1">
            <a
              href="https://maps.app.goo.gl/P7YdhFAMqjnkv3EL6"
              className={cn(
                buttonVariants({
                  size: 'sm',
                  variant: 'default',
                }),
                'w-[250px] bg-[#a85200] hover:bg-[#8a4500] text-white transition-colors text-xs'
              )}
              target="_blank"
              rel="noreferrer"
            >
              Buka peta
            </a>
          </motion.div>
        </div>
      </motion.div>

      <img
        src="/images/gunungan.png"
        className="pointer-events-none w-full h-auto absolute -left-58 bottom-20 scale-300 opacity-[15%] invert-[0.5] blur-[3px]"
      />
      <img
        src="/images/rama.png"
        alt="Sinta"
        className="pointer-events-none h-auto w-full absolute -bottom-2 -right-40 select-none opacity-10 transform scale-x-120 scale-y-120"
        aria-hidden="true"
      />
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
  )
}
