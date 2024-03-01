import React from 'react'
import classes from "./page.module.css"
import { slugGetDonor } from "@/lib/donors"
import Image from "next/image"
import { notFound } from "next/navigation"
import { checkFriendshipWithCurrentUser } from '@/lib/actions'
import ConnectionRequest from '@/components/friend-connection/connection-request'

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
    const friendshipStatus = await checkFriendshipWithCurrentUser(donor.userID);

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
           <ConnectionRequest name={donor.donorName} second_userID={donor.userID} friendshipStatus={friendshipStatus}/>
          </main>
        </>
      )
}
