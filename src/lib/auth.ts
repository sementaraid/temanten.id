import { AUTH_SCRIPT_ID } from "@shared/constant"
import type { IJWTPayload } from "@shared/types";

/**
 * Updates the window.__AUTH__ object with new authentication state
 * 
 * This function is called after login/logout to update the auth state
 * in the browser. It removes any existing auth script and creates a new one
 * with the updated token information.
 * 
 * @param token - JWT token string, or null/undefined for logout
 * 
 * @example
 * // After successful login
 * await authCallback(jwtToken)
 * 
 * // On logout
 * await authCallback(null)
 */
export const authCallback = async (token: string | null | undefined): Promise<{
    isLoggedIn: boolean;
    user: IJWTPayload;
}> => {
  // 1. Remove existing auth script if it exists
  const existing = document.getElementById(AUTH_SCRIPT_ID)
  if (existing) {
    existing.remove()
  }

  // 2. Determine auth state based on token
  const authState = token
    ? {
        isLoggedIn: true,
        user: JSON.parse(atob(token.split('.')[1])),
      }
    : {
        isLoggedIn: false,
        user: {},
      }

  // 3. Create new script element
  const script = document.createElement('script')
  script.id = AUTH_SCRIPT_ID
  script.type = 'text/javascript'
  script.innerHTML = `window.__AUTH__ = ${JSON.stringify(authState)}`

  // 4. Add script to document head
  document.head.appendChild(script)
  return authState
}