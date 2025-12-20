import { useTemantenState } from '@/context'
import Snowfall from 'react-snowfall'

export const SnowfallEffect = () => {
  const { screenState } = useTemantenState()
  if (screenState === 'welcome') return null
  return (
    <Snowfall
      color="#e1c6acff"
      snowflakeCount={100}
      wind={[-1, 1]}
      radius={[1, 4]}
      speed={[1, 3]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: 0.8,
      }}
    />
  )
}
