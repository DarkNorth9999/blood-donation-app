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
      patient_name: patient.patient_name,
      description: patient.patient_details,
    }
}



export default async function PatientDetailsPage({params}:{params:any}) {
    const patient = await slugGetPatient(params.slug);
    if(!patient) notFound();

    const friendshipStatus = await checkFriendshipWithCurrentUser(patient.user_id);

    const session = await getServerSession(options)
    if(session==null){
      throw new Error('It seems you are not logged-in')
    }
    const user = session?.user;


    return (
        <>
          <header className={classes.header}>
            <div className={classes.image}>
              <Image src={patient.patient_image} alt={patient.patient_name} fill />
            </div>
            <div className={classes.headerText}>
              <h1>{patient.patient_name}</h1>
              <p className={classes.creator}>
                 <a href={`#`}>{patient.patient_location}</a>
              </p>
              <p className={classes.summary}>Blood Group: {patient.patient_bloodgroup}</p>
            </div>
          </header>
          <main>
            <p
              className={classes.instructions}
              dangerouslySetInnerHTML={{
                __html: patient.patient_details,
              }}
            ></p>

             
              <ConnectionRequest name={patient.patient_name} second_user_id={patient.user_id} friendshipStatus={friendshipStatus}/>
           
          </main>
        </>
      )
}
