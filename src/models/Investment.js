// src/models/Investment.js
class Investment {
    constructor({ Investment_ID, innovation_ID, commitment_ID, Publish_Date }) {
      this.Investment_ID = Investment_ID;
      this.innovation_ID = innovation_ID;
      this.commitment_ID = commitment_ID;
      this.Publish_Date = Publish_Date;
    }
  
    static Add(data) {
      // API call to add an investment
    }
  
    static Edit(Investment_ID, data) {
      // API call to edit an investment
    }
  
    static Delete(Investment_ID) {
      // API call to delete an investment
    }
  
    static Display(Investment_ID) {
      // API call to display investment details
    }
  }
  
  export default Investment;
  