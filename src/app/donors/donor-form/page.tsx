'use client'
import {donorRegistration }from '@/lib/actions';
import classes from "./page.module.css"
import ImagePicker from "@/components/image-picker/image-picker"
import DonorsFormSubmit from '@/components/donors/donors-form-submit';
import { useFormState } from 'react-dom';

export default function DonorForm() {

  const [state, formAction] = useFormState<any, FormData>(donorRegistration,{message:null});

  return (
    <>
      <header className={classes.header}>
        <h1>
          Become a <span className={classes.highlight}>Donor</span>
        </h1>
        <p>Feel the joy of letting people live to smile again</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="donorName">Your name</label>
              <input type="text" id="donorName" name="donorName" required />
            </p>
            <p>
              <label htmlFor="donorBloodgroup">Your Blood Group</label>
              <input type="text" id="donorBloodgroup" name="donorBloodgroup" required />
            </p>
          </div>
          <p>
            <label htmlFor="donorLocation">Donor Location</label>
            <input type="text" id="donorLocation" name="donorLocation" required />
          </p>
          <p>
            <label htmlFor="donorDetails">Donor Details</label>
            <textarea
              id="donorDetails"
              name="donorDetails"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="donorImage" name="donorImage"/>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <DonorsFormSubmit/>
          </p>
          
        </form>
      </main>
    </>
  )
}
