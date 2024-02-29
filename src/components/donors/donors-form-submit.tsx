'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function DonorsFormSubmit() {
    const {pending} = useFormStatus();

  return (
    <button disabled={pending}>
        {pending?'Submitting...':'Become a Donor'}
    </button>
  )
}
