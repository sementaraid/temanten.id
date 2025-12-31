import type { IJWTPayload } from '../shared/types'

declare global {
  interface Window {
    __AUTH__: {
      isLoggedIn: boolean,
      user: Partial<IJWTPayload>
    }
  }
}

export { }
