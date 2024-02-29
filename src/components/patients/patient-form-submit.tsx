'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function PatientsFormSubmit() {
    const {pending} = useFormStatus();

  return (
    <button disabled={pending}>
        {pending?'Submitting...':'Join Our Community'}
    </button>
  )
}
