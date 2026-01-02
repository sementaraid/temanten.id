import { useIsIframe } from "@/hooks/useIsIframe";
import { useWindow } from "@/hooks/useWindow"
import { cn } from "@/lib/utils";
import type { ReactNode } from "react"

export const WindowFrame = ({ children }: { children: ReactNode }) => {
  const isClient = useWindow();
  const isIframe = useIsIframe();

  if (!isClient) return null
  return (
    <div className={cn(
      "w-full m-auto bg-[beige]",
      !isIframe && 'max-w-screen-sm'
    )}>
      {children}
    </div>
  )
}