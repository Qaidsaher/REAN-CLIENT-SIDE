// src/models/Innovator.js
class Innovator {
    constructor({
      innovator_ID,
      first_name,
      last_name,
      email,
      city,
      education,
      password,
      photo,
      phone,
      birthday,
      account_x,
      publish_Date,
    }) {
      this.innovator_ID = innovator_ID;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.city = city;
      this.education = education;
      this.password = password;
      this.photo = photo;
      this.phone = phone;
      this.birthday = birthday;
      this.account_x = account_x;
      this.publish_Date = publish_Date;
    }
  
    static Add(data) {
      // Logic to add a new innovator (e.g., API call)
    }
  
    static Edit(innovator_ID, data) {
      // Logic to edit innovator details
    }
  
    static Delete(innovator_ID) {
      // Logic to delete innovator
    }
  
    static Search(query) {
      // Logic to search by innovator_ID, name, email, or phone
    }
  }
  
  export default Innovator;
  