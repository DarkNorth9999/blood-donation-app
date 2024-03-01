import React from 'react'
import classes from "./page.module.css"
import { slugGetDonor } from "@/lib/donors"
import Image from "next/image"
import { notFound } from "next/navigation"

let donorVal;

// async function gettingDonorUsingSlug(slug){
//   let donor = await slugGetDonor(slug);
//   return donor[0];
// }

export async function generateMetadata({params}:{params:any}) {
    const donor = await slugGetDonor(params.slug);
    
    if (!donor) {
      notFound()
    }
    return {
      donorName: donor.donorName,
      description: donor.donorDetails,
    }
  }

export default async function DonorDetailsPage({params}:{params:any}) {
    const donor = await slugGetDonor(params.slug); 

    if(!donor) notFound();
    return (
        <>
          <header className={classes.header}>
            <div className={classes.image}>
              <Image src={donor.donorImage} alt={donor.donorName} fill />
            </div>
            <div className={classes.headerText}>
              <h1>{donor.donorName}</h1>
              <p className={classes.creator}>
                 <a href={`#`}>{donor.donorLocation}</a>
              </p>
              <p className={classes.summary}>Blood Group: {donor.donorBloodgroup}</p>
            </div>
          </header>
          <main>
            <p
              className={classes.instructions}
            >{donor.donorDetails}</p>
            <button>Connect with {donor.donorName}</button>
          </main>
        </>
      )
}
