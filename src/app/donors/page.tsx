import DonorsGrid from '@/components/donors/donors-grid';
import React, { Suspense } from 'react'
import {getDonors} from '@/lib/donors'
import classes from './page.module.css'
import Link from 'next/link';
import SearchOptions from '@/components/search-options/search-options';

export const metadata = {
  title:"All Donors",
  description:"Browse the list of all registered donors"
}

async function Donors({searchParams}:{
  searchParams: { [key: string]: string | string[] | undefined }
}){
  const donors = await getDonors(1,2,3);
  return <DonorsGrid donors = {donors} searchParams={searchParams}></DonorsGrid>
}

export default function donorPage({searchParams}:{
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  

  return (
    <>
    <SearchOptions pageName={'donors'}/>
    <header className={classes.header}>
      <h1>Our <span className={classes.highlight}>Heros!</span></h1>
      <p>Brave people always ready to save lives</p>
      <p className={classes.cta}>
        <Link href='patients/patient-form'>Request Blood</Link>
      </p>
    </header>
    <main className={classes.main}>
      <Suspense
      fallback = {<p className={classes.loading}>fetching donor data...</p>}
      >
        <Donors searchParams={searchParams}/>
      </Suspense>
    </main>
    </>
  )
}
