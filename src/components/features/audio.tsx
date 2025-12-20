import { useTemantenState } from '@/context'
import { useEffect, useRef } from 'react'

export const Audio = () => {
  const { playAudio } = useTemantenState()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playAudio) {
      const playPromise = audio.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // autoplay blocked by browser; user interaction required
        })
      }
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }, [playAudio])

  return (
    <audio
      ref={audioRef}
      src="/music/pawestri_cut.mp3"
      loop
      preload="auto"
      className="hidden"
    />
  )
}
