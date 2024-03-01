import PatientsGrid from '@/components/patients/patients-grid';
import Link from 'next/link'
import React, { Suspense } from 'react'
import {getPatients} from '../../lib/patients'
import classes from './pages.module.css'
import SearchOptions from '@/components/search-options/search-options';


export const metadata = {
  title:"All Patients",
  description:"Browse the list of all registered patients"
}

async function Patients({searchParams}:{
  searchParams: { [key: string]: string | string[] | undefined }
}){
  const patients = await getPatients();
  return <PatientsGrid patients={patients} searchParams={searchParams}></PatientsGrid>
}

export default function patientPage({searchParams}:{
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  
  return (
    <>
    <SearchOptions pageName={'patients'}/>
    <header className={classes.header}>
      <h1>Become their <span className={classes.highlight}>Savior</span></h1>
      <p>Your donation can save lives</p>
      <p className={classes.cta}>
        <Link href='donors/donor-form'>Donate Blood</Link>
      </p>
    </header>
    <main className={classes.main}>
      <Suspense
      fallback = {<p className={classes.loading}>fetching patient data...</p>}
      >
        <Patients searchParams={searchParams}/>
      </Suspense>
    </main>
    </>
  )
}
