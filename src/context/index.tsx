import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

import { TEMANTEN_DEFAULT_VALUE } from './constant'
import type { AuthContextValue, AuthState, TemantenContexTypet } from './types'
import type { IJWTPayload } from '@shared/types'

interface TemantenProviderProps {
  children: ReactNode
}

// state context
const TemantenStateContext = createContext<TemantenContexTypet | undefined>(
  undefined
)

// dispatch context
const TemantenDispatchContext = createContext<
  Dispatch<SetStateAction<TemantenContexTypet>> | undefined
>(undefined)

// provider
export const TemantenProvider = ({ children }: TemantenProviderProps) => {
  const [state, setState] = useState<TemantenContexTypet>(
    TEMANTEN_DEFAULT_VALUE
  )

  return (
    <TemantenStateContext.Provider value={state}>
      <TemantenDispatchContext.Provider value={setState}>
        {children}
      </TemantenDispatchContext.Provider>
    </TemantenStateContext.Provider>
  )
}

// hooks
export const useTemantenState = () => {
  const ctx = useContext(TemantenStateContext)
  if (ctx === undefined) {
    throw new Error('useTemantenState must be used within TemantenProvider')
  }
  return ctx
}

export const useTemantenSetter = () => {
  const ctx = useContext(TemantenDispatchContext)
  if (ctx === undefined) {
    throw new Error('useTemantenSetter must be used within TemantenProvider')
  }
  return ctx
}

// convenience hook (NO React types!)
export const useTemanten = (): [
  TemantenContexTypet,
  Dispatch<SetStateAction<TemantenContexTypet>>,
] => {
  return [useTemantenState(), useTemantenSetter()]
}
