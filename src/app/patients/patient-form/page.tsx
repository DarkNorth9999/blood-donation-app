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
              <label htmlFor="patient_name">Your name</label>
              <input type="text" id="patient_name" name="patient_name" required />
            </p>
            <p>
              <label htmlFor="patient_bloodgroup">Your Blood Group</label>
              <input type="text" id="patient_bloodgroup" name="patient_bloodgroup" required />
            </p>
          </div>
          <p>
            <label htmlFor="patient_location">Patient Location</label>
            <input type="text" id="patient_location" name="patient_location" required />
          </p>
          <p>
            <label htmlFor="patient_details">Patient Details</label>
            <textarea
              id="patient_details"
              name="patient_details"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="patient_image" name="patient_image"/>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <PatientsFormSubmit/>
          </p>
          
        </form>
      </main>
    </>
  )
}

