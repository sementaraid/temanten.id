import { useEffect, useState } from "react"

export const useIsIframe = () => {
  const [isIframe, setIsIframe] = useState<boolean>(false)
  
  useEffect(() => {
    if (window) {

      setIsIframe(window.self !== window.top)
    }
  }, [])

  return isIframe
}