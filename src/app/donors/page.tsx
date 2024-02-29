import DonorsGrid from '@/components/donors/donors-grid';
import React, { Suspense } from 'react'
import {getDonors} from '@/lib/donors'
import classes from './page.module.css'
import Link from 'next/link';

export const metadata = {
  title:"All Donors",
  description:"Browse the list of all registered donors"
}

async function Donors(){
  const donors = await getDonors();
  return <DonorsGrid donors = {donors}></DonorsGrid>
}

export default function donorPage() {

  return (
    <>
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
        <Donors/>
      </Suspense>
    </main>
    </>
  )
}
