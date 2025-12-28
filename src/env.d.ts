import type { IJWTPayload } from '../types'

declare global {
  interface Window {
    __AUTH__: {
      isLoggedIn: boolean,
      user: Partial<IJWTPayload>
    }
  }
}

export { }
