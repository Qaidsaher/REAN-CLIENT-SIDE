// src/models/Chat.js
class Chat {
    constructor({ ID, Sender_ID, Receiver_ID, Message, status, Publish_date }) {
      this.ID = ID;
      this.Sender_ID = Sender_ID;
      this.Receiver_ID = Receiver_ID;
      this.Message = Message;
      this.status = status;
      this.Publish_date = Publish_date;
    }
  
    static Add(data) {
      // API call to add a chat message
    }
  
    static Edit(ID, data) {
      // API call to edit a chat message
    }
  
    static Delete(ID) {
      // API call to delete a chat message
    }
  
    static Search(query) {
      // API call to search chat messages by ID
    }
  }
  
  export default Chat;
  