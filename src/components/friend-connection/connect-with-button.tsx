'use client'
import { revalidatePath } from 'next/cache';
import React, { useEffect, useState } from 'react'
import revalidateIt from './revalidate'

/* Status{

    Chat with Person (Already Friends),
    Go to Donor's Page (Same Person),
    Connect with Person - [Notification Action],
    Connection Requested

} */



export default function ConnectWith({connectionForm, connectionTo, name, slug}:{connectionForm:any, connectionTo:any, name:any, slug:any}) {

    const [friendRequest,setFriendRequest] = useState(false)

    const onClickFriend =()=>{
        setFriendRequest( true);
    }
   
    return (
        <button  onClick={()=>onClickFriend()} disabled={friendRequest}>{!friendRequest?`Connect with ${name}`:"Request Sent"}</button>
    )
}
