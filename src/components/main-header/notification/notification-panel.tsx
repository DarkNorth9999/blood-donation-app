'use client'
import React, { useState } from 'react'
import classes from './notification-panel.module.css'
import NotificationCardList from './notification-card-list'
import { NotificationType } from '@/components/enums/notificationType'

export default function NotificationPanel({notifications}) {
  enum bellOptions {
    notification,
    connection
  }
  
  const [bell, setBell] = useState(bellOptions.connection);
  
  function toggleBells(selectedOption:bellOptions){
    if(bell!==selectedOption){
      setBell(selectedOption);
    }
  }

  return (     

      <div className={classes['notification-panel']}>

        <h1>NotificationPanel</h1>
        
        <div>
        <button onClick={()=>toggleBells(bellOptions.notification)}>Notifications</button>
        <button onClick={()=>toggleBells(bellOptions.connection)}>Connection Requests</button>
        </div>

        <div>
          { bell == bellOptions.notification && <NotificationCardList notifications={notifications} type={NotificationType.NOTIFICATION}/>}
          { bell == bellOptions.connection && <NotificationCardList notifications={notifications} type={NotificationType.CONNECTION}/>}
        </div>

      </div>
    
  )
}
