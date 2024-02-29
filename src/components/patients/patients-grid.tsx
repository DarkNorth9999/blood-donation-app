import React from 'react'
import classes from './patients.grid.module.css'
import Patient from './patient'

export default function PatientsGrid({patients}:{
    patients:any
}) {
  
  return (
    <ul className={classes.patients}>
    {patients.map((patient:any)=> 
      <li key={patient.id}>
      <Patient {...patient} />
    </li>
     )}
  </ul>

  )
}
