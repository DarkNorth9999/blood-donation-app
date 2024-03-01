'use client'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import NavLink from '../main-header/nav-link'
import classes from '../main-header/main-header.module.css'
import NotificationBell from '../main-header/notification/notification-bell'
import Image from 'next/image'


export default function HeaderUL({user, notifications}) {
  return (
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
                  <Link href='' onClick={()=>{signOut({callbackUrl:'/'})}}>
                    <Image src={user.image as string} alt={user.name as string} width={300} height={300}/>
                  </Link>
              </li>
            </>):(
             <button className={classes['login-button']} onClick={async ()=>
              signIn('google',{callbackUrl:'/'})
            }>Login In</button>
            )}
        </ul>
  )
}
