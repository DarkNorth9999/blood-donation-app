'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function ConnectionSubmit() {
    const {pending} = useFormStatus();

  return (
    <button disabled={pending}>
        {pending?'Friend Request Sent':'Become a Donor'}
    </button>
  )
}
