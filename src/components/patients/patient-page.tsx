// 'use client'
// import Link from 'next/link'
// import React, { Suspense, useState } from 'react'
// import classes from '../../app/patients/pages.module.css'
// import SearchOptions from '@/components/search-options/search-options';
// import Patients from '@/components/patients/patients-fetcher';

// export default function PatientPage({searchParams}) {

//     const [bloodgroup, setBloodgroup] = useState('');
//     const [location, setLocation] = useState('');
//     const [name, setName] = useState('');

//   return (
//     <div>
//       <header className={classes.header}>
//       <SearchOptions setBloodgroup={setBloodgroup} setLocation={setLocation} setName={setName}  pageName={'patient'}/>
//       <h1>Become their <span className={classes.highlight}>Savior</span></h1>
//       <p>Your donation can save lives</p>
//       <p className={classes.cta}>
//         <Link href='donors/donor-form'>Donate Blood</Link>
//       </p>
//     </header>
//     <main className={classes.main}>
//       <Suspense
//       fallback = {<p className={classes.loading}>fetching patient data...</p>}
//       >
//         <Patients bloodgroup={bloodgroup} location={location} name={name} searchParams={searchParams}/>
//       </Suspense>
//     </main>
//     </div>
//   )
// }
