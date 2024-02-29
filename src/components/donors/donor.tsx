import Image from "next/image"
import Link from "next/link"
import React from "react"
import classes from './donor.module.css'

export default function Donor({ donor_name, slug, donor_image, donor_location, donor_bloodgroup, donor_details }:{
  donor_name:any, 
  slug:any, 
  donor_image:any, 
  donor_location:any, 
  donor_bloodgroup:any, 
  donor_details:any
}) {
  
    return (
        <article className={classes.donor}>
          <header>
            <div className={classes.image}>
              <Image src={donor_image} alt={donor_name} fill />
              {/* nextjs will fill the space based on its parent components */}
            </div>
            <div className={classes.headerText}>
              <h2>{donor_name}</h2>
              <h3>Blood Group: {donor_bloodgroup}</h3>
              <p>{donor_location}</p>
            </div>
          </header>
          <div className={classes.content}>
            <p className={classes.summary}>{donor_details}</p>
            <div className={classes.actions}>
              <Link href={`/donors/${slug}`}>View Details</Link>
            </div>
          </div>
        </article>
      )
}