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
      donor_name: donor.donor_name,
      description: donor.donor_details,
    }
  }

export default async function DonorDetailsPage({params}:{params:any}) {
    const donor = await slugGetDonor(params.slug); 

    if(!donor) notFound();
    return (
        <>
          <header className={classes.header}>
            <div className={classes.image}>
              <Image src={donor.donor_image} alt={donor.donor_name} fill />
            </div>
            <div className={classes.headerText}>
              <h1>{donor.donor_name}</h1>
              <p className={classes.creator}>
                 <a href={`#`}>{donor.donor_location}</a>
              </p>
              <p className={classes.summary}>Blood Group: {donor.donor_bloodgroup}</p>
            </div>
          </header>
          <main>
            <p
              className={classes.instructions}
            >{donor.donor_details}</p>
            <button>Connect with {donor.donor_name}</button>
          </main>
        </>
      )
}
