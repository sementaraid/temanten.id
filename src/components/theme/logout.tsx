import { useState } from "react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useSWRMutation from "swr/mutation"
import { postFetcher } from "@/lib/fetcher"
import { useNavigate } from "react-router"

type LogoutResponse = {
  message: string
}

const AUTH_SCRIPT_ID = '__auth_script__'

export const LogoutDialog = () => {
  const navigate = useNavigate()
  const { trigger, isMutating } = useSWRMutation<
    LogoutResponse,
    Error,
    string
  >(`http://localhost:3000/api/auth/logout`, postFetcher())

  const handleLogout = async () => {
    try {
      const response = await trigger()
      if (!response) throw Error('Logout Failed')

      const existing = document.getElementById(AUTH_SCRIPT_ID)
      if (existing) {
        existing.remove()
      }

      const script = document.createElement('script')
      script.id = AUTH_SCRIPT_ID
      script.type = 'text/javascript'
      script.textContent = `window.__AUTH__ = ${JSON.stringify({
        isLoggedIn: false,
        user: {}
      })}`
      document.head.appendChild(script)
      navigate('/')
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-4 py-3">
          <LogOut size={18} className="flex-shrink-0" />
          <span className="ml-2 overflow-hidden whitespace-nowrap">Logout</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout? You'll need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isMutating}
            className="bg-red-600 hover:bg-red-700"
          >
            {isMutating ? "Logging out..." : "Logout"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}