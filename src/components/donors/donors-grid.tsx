import React from 'react'
import classes from './donors.grid.module.css'
import Donor from './donor'

export default function DonorsGrid({donors}:{
  donors:any
}) {
  return (
    <ul className={classes.donors}>
      {donors.map((donor:any)=> <li key={donor.id}>
        <Donor {...donor} />
      </li> )}
    </ul>
  )
}
