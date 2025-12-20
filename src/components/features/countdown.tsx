import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export type CountdownTime = {
  days: string
  hours: string
  minutes: string
  seconds: string
  completed: boolean
}

type CountdownProps = {
  targetDate: Date
  onComplete?: () => void
  children: (time: CountdownTime) => React.ReactNode
}

export const Countdown = ({
  targetDate,
  onComplete,
  children,
}: CountdownProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 🔑 hydration guard
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const calculate = (): CountdownTime => {
    const diff = dayjs(targetDate).diff(dayjs())

    if (diff <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        completed: true,
      }
    }

    const d = dayjs.duration(diff)

    return {
      days: String(Math.floor(d.asDays())).padStart(2, '0'),
      hours: String(d.hours()).padStart(2, '0'),
      minutes: String(d.minutes()).padStart(2, '0'),
      seconds: String(d.seconds()).padStart(2, '0'),
      completed: false,
    }
  }

  const [time, setTime] = useState<CountdownTime>(() => ({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    completed: false,
  }))

  useEffect(() => {
    if (!mounted) return

    setTime(calculate())

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev.completed) return prev
        return calculate()
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [mounted, targetDate])

  useEffect(() => {
    if (time.completed) {
      intervalRef.current && clearInterval(intervalRef.current)
      intervalRef.current = null
      onComplete?.()
    }
  }, [time.completed])

  // ❗ render nothing on server
  if (!mounted) return null

  return <>{children(time)}</>
}
