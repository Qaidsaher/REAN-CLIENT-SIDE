// src/models/Notification.js
class Notification {
    constructor({ notification_ID, content_noti, Name_notification, Type, Receive }) {
      this.notification_ID = notification_ID;
      this.content_noti = content_noti;
      this.Name_notification = Name_notification;
      this.Type = Type;
      this.Receive = Receive;
    }
  
    // Methods to add, send, and delete notifications
    static Add(data) {
      // Logic to add a notification
    }
  
    static Send(Name_notification, content_noti) {
      // Logic to send a notification
    }
  
    static Delete(notification_ID) {
      // Logic to delete a notification
    }
  }
  
  export default Notification;
  