"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import MainLogo from "@/assets/MainLogo.png"
import classes from "./image-slideshow.module.css"

const images = [
  { image: MainLogo, alt: "A delicious, juicy burger" },
//   { image: curryImg, alt: "A delicious, spicy curry" },
//   { image: dumplingsImg, alt: "Steamed dumplings" },
//   { image: macncheeseImg, alt: "Mac and cheese" },
//   { image: pizzaImg, alt: "A delicious pizza" },
//   { image: schnitzelImg, alt: "A delicious schnitzel" },
//   { image: tomatoSaladImg, alt: "A delicious tomato salad" },
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