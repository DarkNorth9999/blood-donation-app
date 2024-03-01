'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import classes from './donors.grid.module.css'
import Donor from './donor'
import PaginationControls from '../pagination/pagination-controls'


export default function DonorsGrid({donors,searchParams}:{
  donors:any,
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '6';

  const start = ((Number(page)-1) * Number(per_page)) 
  const end = start + (Number(per_page)); 

  const [entries,setEntries] = useState(donors.slice(start,end));

  useEffect(()=>{
    setEntries(donors.slice(start,end))
  },[start,end])


  return (
    <div>
      <ul className={classes.donors}>
        {entries.map((donor:any)=> <li key={donor.id}>
          <Donor {...donor} />
        </li> )}
      </ul>
      <PaginationControls
      hasNextPage={end < donors.length}
      hasPrevPage={start > 0}/>
    </div>

  )
}
