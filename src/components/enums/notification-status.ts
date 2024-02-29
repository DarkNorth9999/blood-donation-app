export enum NotificationStatus{
    ACCEPTED,
    REJECTED,
    SEEN,
    UNOPENED
}


/***********
 * Whenever a notification will be created, it will be UNOPENED State
 * After the CONNECTION is clicked, all pending notifications will become NOTRESPONDED
 * After user choice, notifications can be accepted or rejected
 */