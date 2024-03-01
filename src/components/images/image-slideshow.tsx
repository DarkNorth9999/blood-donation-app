"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import MainImg1 from '@/assets/main-logo-img-1.jpg'
import MainImg2 from '@/assets/main-logo-img-2.jpg'
import MainImg3 from '@/assets/main-logo-img-3.jpg'
import MainImg4 from '@/assets/main-logo-img-4.jpg'
import MainImg5 from '@/assets/main-logo-img-5.jpg'
import classes from "./image-slideshow.module.css"

const images = [
  { image: MainImg1, alt: "Children playing" },
  { image: MainImg2, alt: "Children jumping in the air" },
  { image: MainImg3, alt: "Children enjoying colors" },
  { image: MainImg4, alt: "people smiling while playing" },
  { image: MainImg5, alt: "image of economically challenged children playing" },
]

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  )
}
