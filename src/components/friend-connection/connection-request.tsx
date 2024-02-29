'use client'
import { requestConnection } from '@/lib/actions';
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom';
import ConnectionSubmit from './connection-submit';
import { Relationship } from '../enums/Relationship';



export default function ConnectionRequest({name,friendshipStatus,second_user_id}:{name:any, friendshipStatus:Relationship,second_user_id:any}) {
    const [state, formAction] = useFormState<any, FormData>((prevState,formData)=>requestConnection(second_user_id),{message:null});
    const [message,setMessage] = useState(friendshipStatus);

    // console.log('Friendship Status',friendshipStatus);

    // useEffect(()=>{
    //     setMessage('Friend Request Send')
    // },[state])

  return (
    <form onSubmit={()=>setMessage(Relationship.Requested)} action={formAction}>
    {/* <ConnectionSubmit friendshipStatus={friendshipStatus}/> */}
    <button disabled={message!=Relationship.NotConnected}>
        {message==Relationship.Connected?'Chat with ${name}':(message==Relationship.NotConnected?`Connect with ${name}`:(message==Relationship.Requested?`Connection Requested`:(message==Relationship.SamePerson?`You Submitted this Form`:'ERROR')))}
    </button>
    </form>
  )
}
