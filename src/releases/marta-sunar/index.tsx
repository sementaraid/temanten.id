import { SnowfallEffect } from '@/components/features/snowfall'
import { Brides } from '@/components/section/brides'
import { Ceremony } from '@/components/section/ceremony'
import { CeremonyAfter } from '@/components/section/ceremony-after'
import { Comments } from '@/components/section/comments'
import { Footer } from '@/components/section/footer'
import { Invitation } from '@/components/section/invitation'
import { LoveStory } from '@/components/section/love-story'
import { Audio } from '@/components/features/audio'
import { SplashScreen } from '@/components/section/welcome'
import { TemantenProvider } from '@/context'
import { cn } from '@/lib/utils'
import '@/releases/marta-sunar/styles/main.css'

const Page = () => {
  const isIframe = window.self !== window.top;
  return (
    <TemantenProvider>
      <div className={cn(
        "w-full m-auto bg-[beige]",
        !isIframe && 'max-w-screen-sm'
      )}>
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
    </TemantenProvider>
  )
}

export default Page
