import React from 'react'
import classes from './notification-card-list.module.css'
import NotificationCard from './notification-card';
import { NotificationType } from '@/components/enums/notificationType';



// const notifications:any[] =[
//   {
//     notification_id:'1',
//     notification_type:'notification',
//     notification_from:'115092327438146919815',
//     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
//     notification_to:'',
//     notification_message_header:'One new Message',
//     notification_message_body:'Replace this with senders message'
//   },
//   {
//     notification_id:'2',
//     notification_type:'connection',
//     notification_from:'115092327438146919815',
//     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
//     notification_to:'',
//     notification_message_header:'Connection Request',
//     notification_message_body:'Replace this with senders message'
//   },
//   {
//     notification_id:'3',
//     notification_type:'notification',
//     notification_from:'115092327438146919815',
//     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
//     notification_to:'',
//     notification_message_header:'One new Message',
//     notification_message_body:'New Update!'
//   },
//   {
//     notification_id:'4',
//     notification_type:'connection',
//     notification_from:'115092327438146919815',
//     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
//     notification_to:'',
//     notification_message_header:'Connection Request',
//     notification_message_body:'Replace this with senders message'
//   }
// ]

export default function NotificationCardList({type, notifications}:{type:NotificationType, notifications:any}) {

  return (
    <ul className={classes['notification-card-list']}>
            {notifications && notifications.map((notification:any)=>{
                if(notification.notification_type === type){
                    return <li key={notification.notification_id}>
                     <NotificationCard notification = {notification} />
                    </li>
                }
            }
        )}
    </ul>
  )
}
