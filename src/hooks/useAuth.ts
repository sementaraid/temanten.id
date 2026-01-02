import type { IJWTPayload } from "@shared/types";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState<{ isLoggedIn: boolean; user: Partial<IJWTPayload>; } | null>(null)

  useEffect(() => {
    if (window) {
      setAuth(window.__AUTH__)
    }
  }, [])

  return auth
}