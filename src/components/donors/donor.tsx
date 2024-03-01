import Image from "next/image"
import Link from "next/link"
import React from "react"
import classes from './donor.module.css'

export default function Donor({ donorName, slug, donorImage, donorLocation, donorBloodgroup, donorDetails }:{
  donorName:any, 
  slug:any, 
  donorImage:any, 
  donorLocation:any, 
  donorBloodgroup:any, 
  donorDetails:any
}) {
  
    return (
        <article className={classes.donor}>
          <header>
            <div className={classes.image}>
              <Image src={donorImage} alt={donorName} fill />
              {/* nextjs will fill the space based on its parent components */}
            </div>
            <div className={classes.headerText}>
              <h2>{donorName}</h2>
              <h3>Blood Group: {donorBloodgroup}</h3>
              <p>{donorLocation}</p>
            </div>
          </header>
          <div className={classes.content}>
            <p className={classes.summary}>{donorDetails}</p>
            <div className={classes.actions}>
              <Link href={`/donors/${slug}`}>View Details</Link>
            </div>
          </div>
        </article>
      )
}