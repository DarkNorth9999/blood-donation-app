'use client'
import React, { useEffect, useState } from 'react'
import classes from './patients.grid.module.css'
import Patient from './patient'
import PaginationControls from '../pagination/pagination-controls'

export default function PatientsGrid({patients,searchParams}:{
    patients:any,
    searchParams: any
}) {

  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '6';

  const start = ((Number(page)-1) * Number(per_page)) // 0 5 10
  const end = start + (Number(per_page)); // 5 10 15

  const [entries,setEntries] = useState(patients.slice(start,end));

  useEffect(()=>{
    setEntries(patients.slice(start,end))
  },[start,end])
  
  return (
  <div>
    <ul className={classes.patients}>
      {entries.map((patient:any)=> 
        <li key={patient.id}>
        <Patient {...patient} />
      </li>
      )}
    </ul>
    <PaginationControls
      hasNextPage={end < patients.length}
      hasPrevPage={start > 0}/>
  </div>

  )
}
