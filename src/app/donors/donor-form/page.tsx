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
              <label htmlFor="donor_name">Your name</label>
              <input type="text" id="donor_name" name="donor_name" required />
            </p>
            <p>
              <label htmlFor="donor_bloodgroup">Your Blood Group</label>
              <input type="text" id="donor_bloodgroup" name="donor_bloodgroup" required />
            </p>
          </div>
          <p>
            <label htmlFor="donor_location">Donor Location</label>
            <input type="text" id="donor_location" name="donor_location" required />
          </p>
          <p>
            <label htmlFor="donor_details">Donor Details</label>
            <textarea
              id="donor_details"
              name="donor_details"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="donor_image" name="donor_image"/>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <DonorsFormSubmit/>
          </p>
          
        </form>
      </main>
    </>
  )
}
