import React from 'react'
import classes from './notification-card.module.css'
import img from '@/../../public/images/archit-gupta.png'
import Image from 'next/image'

export default function NotificationTypeSlugElement() {
  return (
    <div className={classes['notification-card']}>
      <Image src={img} alt={'notification card image'}  width={60} height={60}></Image>
      <div>
      <h3>You received a message from archit</h3>
      <p>One new notification from archit gupta</p>
      </div>
    </div>
  )
}
