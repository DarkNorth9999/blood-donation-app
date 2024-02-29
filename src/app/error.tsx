'use client'
import Error from 'next/error'
import React from 'react'

export default function ErrorPage({error}:{
    error: Error
}) {
  return (
    <main className="error">
      <h1>An Error Occurred!</h1>
      <p>Something Failed, please try again later</p>
    </main>
  )
}
