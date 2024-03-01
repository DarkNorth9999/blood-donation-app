'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function LoginButton() {
  return (
    <button onClick={async ()=>
        signIn('google',{callbackUrl:'/'})
      }>Login In</button>
  )
}
