'use client'
import Link from 'next/link';
import React from 'react'
import classes from './nav-link.module.css'
import { usePathname } from 'next/navigation';

export default function NavLink({href, children}: Readonly<{
    children: React.ReactNode;
    href:string}>)
{

    const path = usePathname();
  return (
    <>
    <Link href={href}
    className={
        path.startsWith(href)?`${classes.link} ${classes.active}`:`${classes.link}`
    }> 
    {children}
    </Link>
    </>
  )
}
