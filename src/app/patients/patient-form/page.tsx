"use client"
import { useFormState } from "react-dom"
import classes from "./page.module.css"
import { patientRegistration } from "@/lib/actions";
import ImagePicker from "@/components/image-picker/image-picker";
import PatientsFormSubmit from "@/components/patients/patient-form-submit";

export default function PatientForm() {

  const [state, formAction] = useFormState<any, FormData>(patientRegistration,{message:null});

  return (
    <>
      <header className={classes.header}>
        <h1>
          We hope you <span className={classes.highlight}>Recover Soon</span>
        </h1>
        <p>Our donors will definitely help you!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="patientName">Your name</label>
              <input type="text" id="patientName" name="patientName" required />
            </p>
            <p>
              <label htmlFor="patientBloodgroup">Your Blood Group</label>
              <input type="text" id="patientBloodgroup" name="patientBloodgroup" required />
            </p>
          </div>
          <p>
            <label htmlFor="patientLocation">Patient Location</label>
            <input type="text" id="patientLocation" name="patientLocation" required />
          </p>
          <p>
            <label htmlFor="patientDetails">Patient Details</label>
            <textarea
              id="patientDetails"
              name="patientDetails"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="patientImage" name="patientImage"/>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <PatientsFormSubmit/>
          </p>
          
        </form>
      </main>
    </>
  )
}

