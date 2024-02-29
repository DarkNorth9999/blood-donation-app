
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
          <ul>
            <li className={classes['page-options']}>
              <NavLink href='/donors'>Donors</NavLink>
            </li>
            <li className={classes['page-options']}>
              <NavLink href='/patients'>Patients</NavLink>
            </li>
            {user?(
            <>
              <li>
                <NotificationBell notifications={notifications}/>
              </li>
              <li className={classes.user}>
                  <Image src={user.image as string} alt={user.name as string} width={300} height={300}/>
              </li>
            </>):(
              <button>Login In</button>
            )}
          </ul>
        </nav>
       </div>
      </header>
    </>
  )
}
