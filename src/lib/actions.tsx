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

export async function checkUserExistence(userID){
  const { data, error } = await supabase.from("users").select().eq("userID", userID)

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
  const userID = user.accessToken;
  const userName = user.name;
  const userEmail = user.email;
  const userImage = user.image;

  const { data, error } = await supabase.from("users").insert([
    {
      userID,
      userName,
      userEmail,
      userImage,
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

export async function fetchUserImage(userID){
  const { data, error } = await supabase.from("users").select().eq("userID", userID)

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch User Image")
  }

  if (data) {
    // console.log(data);
    return data[0].userImage;
  }
}

export async function fetchNotifications(userID){
  const { data, error } = await supabase.from("users").select().eq("userID", userID)

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
    donorName: formData.get("donorName"),
    donorImage: formData.get("donorImage"),
    donorLocation: formData.get("donorLocation"),
    donorBloodgroup: formData.get("donorBloodgroup"),
    donorDetails: formData.get("donorDetails"),
  }

  if(
    isInvalidText(donor.donorName as String) ||
    isInvalidText(donor.donorLocation as String) ||
    isInvalidText(donor.donorBloodgroup as String) ||
    isInvalidText(donor.donorDetails as String) ||
    (!(donor.donorBloodgroup! as String).includes('+') && !(donor.donorBloodgroup! as String).includes('-')) ||
    !donor.donorImage || (donor.donorImage as File).size === 0
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
    patientName: formData.get("patientName"),
    patientImage: formData.get("patientImage"),
    patientLocation: formData.get("patientLocation"),
    patientBloodgroup: formData.get("patientBloodgroup"),
    patientDetails: formData.get("patientDetails"),
  }

  if(
    isInvalidText(patient.patientName as String) ||
    isInvalidText(patient.patientLocation as String) ||
    isInvalidText(patient.patientBloodgroup as String) ||
    isInvalidText(patient.patientDetails as String) ||
    (!(patient.patientBloodgroup! as String).includes('+') && !(patient.patientBloodgroup! as String).includes('-')) ||
    !patient.patientImage || (patient.patientImage as File).size === 0
  ){
    return{
      message:"Invalid Input"
    }
  }

  await savePatient(patient);
  revalidatePath('/patients','layout')
  redirect('/patients');
}

export async function fetchingFriendShipCheck(friendA,friendB){
  const { data, error } = await supabase
  .from('friends')
  .select()
  .eq('friendA',friendA)
  .eq('friendB',friendB)

  if (error) {
    console.log(error);
    throw new Error("Failed to fetch connection")
  }

  if (data) {
    if(data.length>0){
      // console.log('Friendship data',data)
     return data[0].friendStatus;
    } 
  }

  return null;
}

export async function checkFriendshipWithCurrentUser(second_userID:any){
  const session = await getServerSession(options)
  const userID = session?.user?.accessToken
  
  // if(userID == second_userID) return Relationship.SamePerson

  let friendshipStatus = await fetchingFriendShipCheck(userID,second_userID);

  if(friendshipStatus===null){
    friendshipStatus = await fetchingFriendShipCheck(second_userID,userID);
  }

  if(friendshipStatus===null){
    friendshipStatus = Relationship.NotConnected;
  }

  /**** check if they are friends here */

  return friendshipStatus;

}

export async function getUserFromDB(userID){
  

  const { data, error } = await supabase.from("users").select().eq("userID", userID)

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch User")
  }

  if (data) {
    // console.log(data);
    return data[0];
  }
}

export async function requestConnection(second_userID){

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
  

    //     notificationID:'1',
    //     notificationType:'notification',
    //     notification_from:'115092327438146919815',
    //     sender_image:'https://lh3.googleusercontent.com/a/ACg8ocKd5S8SB5Ho7HuwKN1WNi4-cCUeFOWZJXYG_3IHhpYzJHM=s96-c',
    //     notification_to:'',
    //     notification_message_header:'One new Message',
    //     notification_message_body:'Replace this with senders message'
    //   }
  const noti_id = uuidv4();
  // console.log(noti_id);

  const notification = {
    notificationID: noti_id,
    notificationType:NotificationType.CONNECTION,
    notification_from: second_userID, // who sent notification
    sender_image: user.userImage,
    notification_to: user.userID, //current user who received the notification
    notification_message_header:'New Connection Request',
    notification_message_body: `${user.userName} wants to connect with you`
  }

  await addToNotificationTable(notification,NotificationStatus.UNOPENED);

  // console.log(notification);
  user.notifications.push(notification)
  /******* add both of them as friends in friend table */

  const { data, error } = await supabase
  .from('users')
  .update({ notifications: user.notifications })
  .eq('userID', second_userID )

  if (error) {
    console.log(error);
    throw new Error("Failed to Send Request")
  }

  if (data) {
    console.log("This is submit data:", data)
  }

  await updateFriendStatus(Relationship.Requested, user.userID, second_userID);

}

export async function updateFriendStatus(friendStatus:Relationship, friendA:any, friendB:any){
  const uuid = uuidv4();
  /**********Friend A: Receiver */
  /********** Friend B: Sender */
  const { data, error } = await supabase
  .from('friends')
  .insert([{
    uuid,
    friendA,
    friendB,
    friendStatus
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
  .update({ notificationStatus: NotificationStatus.SEEN})
  .eq('notificationType', NotificationType.CONNECTION )

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
  .update({ notificationStatus: NotificationStatus.SEEN})
  .eq('notificationType', NotificationType.NOTIFICATION )

  if (error) {
    console.log(error);
    throw new Error("Failed to mark notifications Others")
  }

  if (data) {
    console.log("notifications are marked Others", data)
  }
}

export async function addToNotificationTable(notification,notificationStatus:NotificationStatus){
  const notificationID = notification.notificationID;
  const notificationType = notification.notificationType;

  const { data, error } = await supabase
  .from('notification')
  .insert([{
    notificationID,
    notificationType,
    notificationStatus
  }])

  if (error) {
    console.log(error);
    throw new Error("Failed to add noti to notification table")
  }

  if (data) {
    console.log("Notification added to table!", data)
  }
}

export async function fetchNotificationStatus(notificationID){
  const { data, error } = await supabase
  .from('notification')
  .select()
  .eq('notificationID',notificationID)

  if (error) {
    console.log(error);
    throw new Error("Failed to fetch current notification status")
  }

  if (data) {
    console.log("Notification current", data);
    if(data.length>0){
      return data[0].notificationStatus;
    }
  }
}

export async function acceptConnectionRequest(friendA, friendB){
  const { data, error } = await supabase
  .from('friends')
  .update({ friendStatus: Relationship.Connected })
  .eq('friendA',friendA)
  .eq('friendB',friendB)

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