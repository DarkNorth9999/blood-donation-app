import React from 'react'
import classes from "./page.module.css"
import { slugGetPatient } from "@/lib/patients"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options'
import ConnectWith from '@/components/friend-connection/connect-with-button'
import ConnectionRequest from '@/components/friend-connection/connection-request'
import { checkFriendshipWithCurrentUser } from '@/lib/actions'



export async function generateMetadata({params}:{params:any}) {
    const patient = await slugGetPatient(params.slug)

    

    if (!patient) {
      notFound()
    }
    return {
      patientName: patient.patientName,
      description: patient.patientDetails,
    }
}



export default async function PatientDetailsPage({params}:{params:any}) {
    const patient = await slugGetPatient(params.slug);
    if(!patient) notFound();

    const friendshipStatus = await checkFriendshipWithCurrentUser(patient.userID);

    const session = await getServerSession(options)
    if(session==null){
      throw new Error('It seems you are not logged-in')
    }
    const user = session?.user;


    return (
        <>
          <header className={classes.header}>
            <div className={classes.image}>
              <Image src={patient.patientImage} alt={patient.patientName} fill />
            </div>
            <div className={classes.headerText}>
              <h1>{patient.patientName}</h1>
              <p className={classes.creator}>
                 <a href={`#`}>{patient.patientLocation}</a>
              </p>
              <p className={classes.summary}>Blood Group: {patient.patientBloodgroup}</p>
            </div>
          </header>
          <main>
            <p
              className={classes.instructions}
            >{patient.patientDetails}</p>

             
              <ConnectionRequest name={patient.patientName} second_userID={patient.userID} friendshipStatus={friendshipStatus}/>
           
          </main>
        </>
      )
}
