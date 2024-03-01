import Image from "next/image"
import Link from "next/link"
import React from "react"
import classes from './patient.module.css'

export default function Patient({ patientName, slug, patientImage, patientLocation, patientBloodgroup, patientDetails }:{
  patientName:any, 
  slug:any, 
  patientImage:any, 
  patientLocation:any, 
  patientBloodgroup:any, 
  patientDetails:any
}) {

  
    return (
        <article className={classes.patient}>
          <header>
            <div className={classes.image}>
              <Image src={patientImage} alt={patientName} fill />
              {/* nextjs will fill the space based on its parent components */}
            </div>
            <div className={classes.headerText}>
              <h2>{patientName}</h2>
              <h3>Blood Group: {patientBloodgroup}</h3>
              <p>{patientLocation}</p>
            </div>
          </header>
          <div className={classes.content}>
            <p className={classes.summary}>{patientDetails}</p>
            <div className={classes.actions}>
              <Link href={`/patients/${slug}`}>View Details</Link>
            </div>
          </div>
        </article>
      )
}
