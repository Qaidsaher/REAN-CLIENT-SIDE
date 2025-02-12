// src/models/Admin.js
class Admin {
    constructor({ Admin_ID, Name, Email, State, password, Publish_Date }) {
      this.Admin_ID = Admin_ID;
      this.Name = Name;
      this.Email = Email;
      this.State = State;
      this.password = password;
      this.Publish_Date = Publish_Date;
    }
  
    // Permissions/controls
    static Control_Admin() {
      // Logic to control admin functions
    }
  
    static Control_investor() {
      // Logic to control investor functions
    }
  
    static Control_innovator() {
      // Logic to control innovator functions
    }
  
    static Control_innovation() {
      // Logic to control innovation functions
    }
  
    static Control_notification() {
      // Logic to control notifications
    }
  
    static Login(email, password) {
      // Logic for admin login
    }
  }
  
  export default Admin;
  