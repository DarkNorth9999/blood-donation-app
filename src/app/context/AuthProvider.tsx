'use client'
import MainHeader from "@/components/main-header/main-header"
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function AuthProvider({children}:{children:React.ReactNode}) {

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
