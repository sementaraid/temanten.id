import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { useTemantenSetter, useTemantenState } from '@/context'

export const SplashScreen = () => {
  const { screenState } = useTemantenState()
  const setUndanganState = useTemantenSetter()

  const show = screenState === 'welcome'

  return (
    <AnimatePresence
      onExitComplete={() => document.body.classList.remove('overflow-hidden')}
    >
      {show && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f5f5dc]"
        >
          <div className="relative w-full h-full overflow-hidden px-6">
            <img
              src="/images/gunungan.png"
              className="pointer-events-none w-full h-auto absolute -left-5 bottom-20 scale-300 opacity-[30%] invert-[0.5] blur-[4px]"
            />
            <motion.div
              id="welcome-screen"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 0.45 },
              }}
              exit={{
                y: -24,
                opacity: 0,
                scale: 0.96,
                transition: { duration: 0.45 },
              }}
              className="flex justify-center items-center min-h-screen flex-col space-y-4"
            >
              <img src="/images/gunungan.png" className="w-48 h-auto" />
              <div className="space-y-4">
                <h2 className="font-arashveti text-4xl font-bold text-[#a85200]">
                  Marta
                </h2>
                <h2 className="font-arashveti text-4xl font-bold text-[#a85200]">
                  Sunar
                </h2>
              </div>
              <p className="text-center text-xs font-open-sans text-gray-700 px-4">
                Tanpa mengurangi rasa hormat, kami mengundang
                Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.
              </p>
              <Button
                size="sm"
                className="w-[250px] bg-[#a85200] hover:bg-[#8a4500] text-white transition-colors text-xs font-open-sans font-semibold"
                onClick={() =>
                  setUndanganState((prev) => ({
                    ...prev,
                    playAudio: prev.screenState === 'welcome',
                    screenState: 'main',
                  }))
                }
              >
                Buka Undangan
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
