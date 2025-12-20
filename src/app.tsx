import { Audio } from '@/components/features/audio'
import { SnowfallEffect } from '@/components/features/snowfall'
import { Brides } from '@/components/section/brides'
import { Ceremony } from '@/components/section/ceremony'
import { CeremonyAfter } from '@/components/section/ceremony-after'
import { Comments } from '@/components/section/comments'
import { Footer } from '@/components/section/footer'
import { Invitation } from '@/components/section/invitation'
import { LoveStory } from '@/components/section/love-story'
import { SplashScreen } from '@/components/section/welcome'

function App() {
  return (
    <div className="w-full max-w-screen-sm m-auto">
      <SplashScreen />
      <Audio />
      <SnowfallEffect />
      <Invitation />
      <Brides />
      <Ceremony />
      <CeremonyAfter />
      <LoveStory />
      <Comments />
      <Footer />
    </div>
  )
}

export default App
