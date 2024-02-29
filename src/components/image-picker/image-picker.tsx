'use client'
import Image from 'next/image';
import classes from './image-picker.module.css'
import React, { useRef, useState } from 'react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function ImagePicker({label,name}:{label:any,name:any}) {

    const [pickedImage, setPickedImage] = useState<string|null>("");

    const imageInput = useRef<HTMLInputElement>(null);

    function handlePickClick(){
        if(imageInput.current!=undefined){
            imageInput.current.click();
        }
    }

    function handleImageChange(event:any){
        const file = event.target.files[0];
        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = ()=>{
            setPickedImage(fileReader.result as string)
        }
        fileReader.readAsDataURL(file)
    }

    return (
    <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No Image Selected by the user</p>}
                {pickedImage && (<Image src={pickedImage} alt="Image selected by the user" fill></Image>)}
            </div>
            <input className={classes.input} type="file" id={name} accept="img/png img/jpeg" name={name} ref={imageInput} onChange={handleImageChange} required/>
            <button className={classes.button} type="button" onClick={handlePickClick}>Pick an Image</button>
        </div>
    </div>
  )
}
