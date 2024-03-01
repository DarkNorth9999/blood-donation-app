import React from 'react'
import classes from './notification-card-list.module.css'
import NotificationCard from './notification-card';
import { NotificationType } from '@/components/enums/notificationType';



// const notifications:any[] =[
//   {
//     notificationID:'1',
//     notificationType:'notification',
//     notification_from:'115092327438146919815',
//     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
//     notification_to:'',
//     notification_message_header:'One new Message',
//     notification_message_body:'Replace this with senders message'
//   },
//   {
//     notificationID:'2',
//     notificationType:'connection',
//     notification_from:'115092327438146919815',
//     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
//     notification_to:'',
//     notification_message_header:'Connection Request',
//     notification_message_body:'Replace this with senders message'
//   },
//   {
//     notificationID:'3',
//     notificationType:'notification',
//     notification_from:'115092327438146919815',
//     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
//     notification_to:'',
//     notification_message_header:'One new Message',
//     notification_message_body:'New Update!'
//   },
//   {
//     notificationID:'4',
//     notificationType:'connection',
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
                if(notification.notificationType === type){
                    return <li key={notification.notificationID}>
                     <NotificationCard notification = {notification} />
                    </li>
                }
            }
        )}
    </ul>
  )
}
