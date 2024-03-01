'use client'
import React, { useEffect, useState } from 'react'
import classes from './notification-card.module.css'
import Image from 'next/image'
import { NotificationType } from '@/components/enums/notificationType'
import { acceptConnectionRequest, fetchNotificationStatus, rejectConnectionRequest } from '@/lib/actions'
import { NotificationStatus } from '@/components/enums/notification-status'



export default function NotificationCard({notification}:{notification:any}) {

  const [status, setStatus] = useState(NotificationStatus.UNOPENED);
  const [connectionCta, setConnectionCta] = useState('')

  useEffect(()=>{
    if(notification){
      const fetchStatus = async () => {
        const currStatus = await fetchNotificationStatus(notification.notificationID)
        setStatus(currStatus);
      }
  
      fetchStatus();
    }
    
  },[])
 
  return (
    <div className={classes['notification-card']}>
    <Image src={notification.sender_image} alt={'notification card image'}  width={60} height={60}/>
    <div>
    <h3>{notification.notification_message_header} {status==NotificationStatus.UNOPENED?'Unopened':'SEEN'}</h3>
    <p>{notification.notification_message_body}</p>
    {notification.notificationType===NotificationType.CONNECTION && (connectionCta === '') && 
    <div>

       <button onClick={()=>{
        const acceptReq = async ()=>{
          await acceptConnectionRequest(notification.notification_to, notification.notification_from);
        } 
        acceptReq()

        setConnectionCta('Connection Request Accepted')
        
       }}>Accept</button>

        <button onClick={async ()=>{
        await rejectConnectionRequest();
       }}>Reject</button> 

    </div>}

    {connectionCta!=''?<p>{connectionCta}</p>:''}
    </div>
  </div>
  )
}


/********
 * Order of friend a and b matters
 * Receiver and Requestee will change based on that
 * on click on accept, friend status should change to Connected
 */

 /**********Friend A: Receiver */
  /********** Friend B: Sender */