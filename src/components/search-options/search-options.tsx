'use client'
import React from 'react'
import { useFormState } from 'react-dom';
import classes from './search-options.module.css'



export default function SearchOptions({pageName}) {
    // const [state, formAction] = useFormState<any, FormData>(OptionParameters,{message:null});
    //{setBloodgroup, setLocation, setName, pageName}


  return (
    <form action='' className={classes.searchForm}>

        <label htmlFor="user-name">Search by {pageName} name</label>
        <input className={' pr-1 pl-1'} name='user-name' type="text" placeholder={`Enter ${pageName} name`} />


        <label htmlFor='location'>Filter Location: </label>
        <select name="location" id="location">
          <option value="delhi">Delhi</option>
          <option value="faridabad">Faridabad</option>
          <option value="pune">Pune</option>
          <option value="bangalore"> Bangalore </option>
          <option value="gurgaon">Gurgaon</option>
          <option value="noida">Noida</option>
        </select>

        <label htmlFor='bloodgroup'>Filter Bloodgroup: </label>
        <select name="bloodgroup" id="boodgroup">
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="AB+">AB+</option>
          <option value="O+">O+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="AB-">AB-</option>
          <option value="O-">O-</option>
        </select>

        <button type='submit' className={'p-3'}>Search</button>

    </form>
  )
}
