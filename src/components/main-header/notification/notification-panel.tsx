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
      <div className={classes['rounded-div']}>
      <div className={classes['notification-panel']}>

        <div className='flex justify-center bg-slate-600 mb-3'><h1 className='text-center'>NotificationPanel</h1></div>
        
        <div className={'flex justify-center gap-3 mb-2'}>
        <button className=' bg-slate-500 pl-1 pr-1' onClick={()=>toggleBells(bellOptions.notification)}>Notifications</button>
        <button className=' bg-slate-500 pl-1 pr-1' onClick={()=>toggleBells(bellOptions.connection)}>Connection Requests</button>
        </div>

        <div>
          { bell == bellOptions.notification && <NotificationCardList notifications={notifications} type={NotificationType.NOTIFICATION}/>}
          { bell == bellOptions.connection && <NotificationCardList notifications={notifications} type={NotificationType.CONNECTION}/>}
        </div>

      </div>
      </div>
    
  )
}
