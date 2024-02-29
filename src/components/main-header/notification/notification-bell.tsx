'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import bell from "../../../../public/images/notification-bell.svg"
import classes from './notification-bell.module.css'
import NotificationPanel from './notification-panel'
import { markAllConnectionNotificationsToSeen } from '@/lib/actions'



export default function NotificationBell({notifications}) {

  const [notificationToggle, setNotificationToggle] = useState(false);

  const refBell = useRef<HTMLDivElement>(null);

  const toggleNotificationBell = ()=>{
    setNotificationToggle(!notificationToggle);
  }

  const closeNotificationBell = ()=>{
    setNotificationToggle(false);
  }


    useEffect(()=>{
      document.addEventListener('click',clickHandler,true)
    },[])

    const clickHandler = (e)=>{
      if(!refBell.current?.contains(e.target)){
        closeNotificationBell();
        const setNotificationToSeen = async () => {
           await markAllConnectionNotificationsToSeen();
        }
        setNotificationToSeen();
      }
      else{
        // CLicked Inside
      }
    }
    

  return (
    
    <div className={classes['notification-bell']} ref={refBell} >
        <Image onClick={()=>toggleNotificationBell()} src={bell} alt='notification icon' width={30} height={30}></Image>
        {notificationToggle && <NotificationPanel notifications={notifications} />}
    </div>
  )
}
