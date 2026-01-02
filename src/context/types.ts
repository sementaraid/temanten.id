import type { IJWTPayload } from "@shared/types"

export type TemantenContexTypet = {
  playAudio: boolean
  screenState: 'welcome' | 'main'
}



/**
 * Auth state structure
 */
export interface AuthState {
  isLoggedIn: boolean
  user: IJWTPayload
}

/**
 * Auth context value
 */
export interface AuthContextValue extends AuthState {}