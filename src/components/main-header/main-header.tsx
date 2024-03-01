
import React from "react"
import Link from "next/link"
import Image from "next/image"
import MainLogo from '@/assets/MainLogo.png'
import NavLink from "./nav-link"
import MainHeaderBackground from "./main-header-background"
import classes from './main-header.module.css'
import { checkUserExistence, registerNewUser } from "@/lib/actions"

import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"
import NotificationBell from "./notification/notification-bell"
import { fetchNotifications } from "@/lib/actions"
import { signIn, signOut } from "next-auth/react"
import HeaderUL from "../AuthSession/HeaderUL"


export default async function MainHeader() {

  const session = await getServerSession(options)
  const user = session?.user;

  const oldUser = user?(await checkUserExistence(user.accessToken)):null;

  console.log("is old user",oldUser)

  if(user && !oldUser){
    registerNewUser(user);
  }

  const notifications = user?(await fetchNotifications(user.accessToken)):null;

//   const notifications:any[] =[
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

  return (
    <>
      <MainHeaderBackground />
      <header className={classes['header-container']}>
       <div className={classes.header}>
       <Link href='/' className={classes.logo}>
          <Image src={MainLogo} alt='Donor App logo' priority></Image>
          <span>Blood Connect</span>
        </Link>
        <nav className={classes.nav}>
          <HeaderUL user={user} notifications={notifications}/>
        </nav>
       </div>
      </header>
    </>
  )
}
