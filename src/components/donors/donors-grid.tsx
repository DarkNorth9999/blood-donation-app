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

  console.log("search params", searchParams)


  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '2';

  const start = ((Number(page)-1) * Number(per_page)) // 0 5 10
  const end = start + (Number(per_page)); // 5 10 15

console.log(start," ",end);
  const [entries,setEntries] = useState(donors.slice(start,end));

  useEffect(()=>{
    console.log(entries);
    console.log(start," ",end);
    setEntries(donors.slice(start,end))
  },[start,end])


  return (
    <div>
      <ul className={classes.donors}>
        {entries.map((donor:any)=> <li key={donor.id}>
          <Donor {...donor} />
        </li> )}
      </ul>
      <PaginationControls/>
    </div>

  )
}
