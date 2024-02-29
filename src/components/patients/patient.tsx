import Image from "next/image"
import Link from "next/link"
import React from "react"
import classes from './patient.module.css'

export default function Patient({ patient_name, slug, patient_image, patient_location, patient_bloodgroup, patient_details }:{
  patient_name:any, 
  slug:any, 
  patient_image:any, 
  patient_location:any, 
  patient_bloodgroup:any, 
  patient_details:any
}) {

  
    return (
        <article className={classes.patient}>
          <header>
            <div className={classes.image}>
              <Image src={patient_image} alt={patient_name} fill />
              {/* nextjs will fill the space based on its parent components */}
            </div>
            <div className={classes.headerText}>
              <h2>{patient_name}</h2>
              <h3>Blood Group: {patient_bloodgroup}</h3>
              <p>{patient_location}</p>
            </div>
          </header>
          <div className={classes.content}>
            <p className={classes.summary}>{patient_details}</p>
            <div className={classes.actions}>
              <Link href={`/patients/${slug}`}>View Details</Link>
            </div>
          </div>
        </article>
      )
}
