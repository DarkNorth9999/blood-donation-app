"use server"
import supabase from "./postgresSql";
import { notFound, redirect } from "next/navigation";
import { saveDonor } from "./donors"
import { savePatient } from "./patients"
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { v4 as uuidv4 } from 'uuid';
import { Relationship } from "@/components/enums/Relationship";
import { NotificationType } from "@/components/enums/notificationType";
import { NotificationStatus } from "@/components/enums/notification-status";



function isInvalidText(text:String){
  return !text || text.trim()=='';
}

export async function checkUserExistence(user_id){
  const { data, error } = await supabase.from("users").select().eq("user_id", user_id)

  if (error) {
    /******** There needs to be a check here based on error codes, if the error is due to supabase servers or there being no user */
    return false;
  }

  if (data) {
    if(data.length==0) return false;
    return true;
  }
}

export async function registerNewUser(user){
  const notifications = [{}];
  const user_id = user.accessToken;
  const user_name = user.name;
  const user_email = user.email;
  const user_image = user.image;

  const { data, error } = await supabase.from("users").insert([
    {
      user_id,
      user_name,
      user_email,
      user_image,
      notifications
    },
  ])

  if (error) {
    console.log(error);
    throw new Error("Failed to add record")
  }

  if (data) {
    console.log("record added")
    console.log("This is submit data:", data)
  }
}

export async function fetchUserImage(user_id){
  const { data, error } = await supabase.from("users").select().eq("user_id", user_id)

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch User Image")
  }

  if (data) {
    // console.log(data);
    return data[0].user_image;
  }
}

export async function fetchNotifications(user_id){
  const { data, error } = await supabase.from("users").select().eq("user_id", user_id)

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch User Notifications")
  }

  if (data) {
    // console.log(data);
    if(data.length==0) return null;
    return data[0].notifications;
  }
}

export async function donorRegistration(prevState:any,formData: FormData) {

  const donor = {
    donor_name: formData.get("donor_name"),
    donor_image: formData.get("donor_image"),
    donor_location: formData.get("donor_location"),
    donor_bloodgroup: formData.get("donor_bloodgroup"),
    donor_details: formData.get("donor_details"),
  }

  if(
    isInvalidText(donor.donor_name as String) ||
    isInvalidText(donor.donor_location as String) ||
    isInvalidText(donor.donor_bloodgroup as String) ||
    isInvalidText(donor.donor_details as String) ||
    (!(donor.donor_bloodgroup! as String).includes('+') && !(donor.donor_bloodgroup! as String).includes('-')) ||
    !donor.donor_image || (donor.donor_image as File).size === 0
  ){
    return{
      message:"Invalid Input"
    }
  }

  await saveDonor(donor);
  revalidatePath('/donors','layout')
  redirect('/donors');
}

export async function patientRegistration(prevState:any,formData: FormData) {

  const patient = {
    patient_name: formData.get("patient_name"),
    patient_image: formData.get("patient_image"),
    patient_location: formData.get("patient_location"),
    patient_bloodgroup: formData.get("patient_bloodgroup"),
    patient_details: formData.get("patient_details"),
  }

  if(
    isInvalidText(patient.patient_name as String) ||
    isInvalidText(patient.patient_location as String) ||
    isInvalidText(patient.patient_bloodgroup as String) ||
    isInvalidText(patient.patient_details as String) ||
    (!(patient.patient_bloodgroup! as String).includes('+') && !(patient.patient_bloodgroup! as String).includes('-')) ||
    !patient.patient_image || (patient.patient_image as File).size === 0
  ){
    return{
      message:"Invalid Input"
    }
  }

  await savePatient(patient);
  revalidatePath('/patients','layout')
  redirect('/patients');
}

export async function fetchingFriendShipCheck(friend_a,friend_b){
  const { data, error } = await supabase
  .from('friends')
  .select()
  .eq('friend_a',friend_a)
  .eq('friend_b',friend_b)

  if (error) {
    console.log(error);
    throw new Error("Failed to fetch connection")
  }

  if (data) {
    if(data.length>0){
      // console.log('Friendship data',data)
     return data[0].friend_status;
    } 
  }

  return null;
}

export async function checkFriendshipWithCurrentUser(second_user_id:any){
  const session = await getServerSession(options)
  const user_id = session?.user?.accessToken
  
  // if(user_id == second_user_id) return Relationship.SamePerson

  let friendshipStatus = await fetchingFriendShipCheck(user_id,second_user_id);

  if(friendshipStatus===null){
    friendshipStatus = await fetchingFriendShipCheck(second_user_id,user_id);
  }

  if(friendshipStatus===null){
    friendshipStatus = Relationship.NotConnected;
  }

  /**** check if they are friends here */

  return friendshipStatus;

}

export async function getUserFromDB(user_id){
  

  const { data, error } = await supabase.from("users").select().eq("user_id", user_id)

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch User")
  }

  if (data) {
    // console.log(data);
    return data[0];
  }
}

export async function requestConnection(second_user_id){

  const session = await getServerSession(options)
  if(!session){
    throw new Error("You are not logged in")
  }
  // console.log("Inside of requestConnection function ********************")

  const user = await getUserFromDB(session?.user?.accessToken);

  if(!user){
    console.log('user not found')
    notFound();
  }
  

    //     notification_id:'1',
    //     notification_type:'notification',
    //     notification_from:'115092327438146919815',
    //     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
    //     notification_to:'',
    //     notification_message_header:'One new Message',
    //     notification_message_body:'Replace this with senders message'
    //   }
  const noti_id = uuidv4();
  // console.log(noti_id);

  const notification = {
    notification_id: noti_id,
    notification_type:NotificationType.CONNECTION,
    notification_from: second_user_id, // who sent notification
    sender_image: user.user_image,
    notification_to: user.user_id, //current user who received the notification
    notification_message_header:'New Connection Request',
    notification_message_body: `${user.user_name} wants to connect with you`
  }

  await addToNotificationTable(notification,NotificationStatus.UNOPENED);

  // console.log(notification);
  user.notifications.push(notification)
  /******* add both of them as friends in friend table */

  const { data, error } = await supabase
  .from('users')
  .update({ notifications: user.notifications })
  .eq('user_id', second_user_id )

  if (error) {
    console.log(error);
    throw new Error("Failed to Send Request")
  }

  if (data) {
    console.log("This is submit data:", data)
  }

  await updateFriendStatus(Relationship.Requested, user.user_id, second_user_id);

}

export async function updateFriendStatus(friend_status:Relationship, friend_a:any, friend_b:any){
  /**********Friend A: Receiver */
  /********** Friend B: Sender */
  const { data, error } = await supabase
  .from('friends')
  .insert([{
    friend_a,
    friend_b,
    friend_status
  }])

  if (error) {
    console.log(error);
    throw new Error("Failed to Send Friend Request")
  }

  if (data) {
    console.log("This is Friend request data:", data)
  }
}


export async function markAllConnectionNotificationsToSeen(){
  const { data, error } = await supabase
  .from('notification')
  .update({ notification_status: NotificationStatus.SEEN})
  .eq('notification_type', NotificationType.CONNECTION )

  if (error) {
    console.log(error);
    throw new Error("Failed to mark notifications")
  }

  if (data) {
    console.log("notifications are marked", data)
  }
}

export async function markAllOtherNotificationsToSeen(){
  const { data, error } = await supabase
  .from('notification')
  .update({ notification_status: NotificationStatus.SEEN})
  .eq('notification_type', NotificationType.NOTIFICATION )

  if (error) {
    console.log(error);
    throw new Error("Failed to mark notifications Others")
  }

  if (data) {
    console.log("notifications are marked Others", data)
  }
}

export async function addToNotificationTable(notification,notification_status:NotificationStatus){
  const notification_id = notification.notification_id;
  const notification_type = notification.notification_type;

  const { data, error } = await supabase
  .from('notification')
  .insert([{
    notification_id,
    notification_type,
    notification_status
  }])

  if (error) {
    console.log(error);
    throw new Error("Failed to add noti to notification table")
  }

  if (data) {
    console.log("Notification added to table!", data)
  }
}

export async function fetchNotificationStatus(notification_id){
  const { data, error } = await supabase
  .from('notification')
  .select()
  .eq('notification_id',notification_id)

  if (error) {
    console.log(error);
    throw new Error("Failed to fetch current notification status")
  }

  if (data) {
    console.log("Notification current", data);
    if(data.length>0){
      return data[0].notification_status;
    }
  }
}

export async function acceptConnectionRequest(friend_a, friend_b){
  const { data, error } = await supabase
  .from('friends')
  .update({ friend_status: Relationship.Connected })
  .eq('friend_a',friend_a)
  .eq('friend_b',friend_b)

  if (error) {
    console.log(error);
    throw new Error("Failed to update connection status")
  }

  if (data) {
    console.log("Notification status", data);
  }
}

export async function rejectConnectionRequest(){

}