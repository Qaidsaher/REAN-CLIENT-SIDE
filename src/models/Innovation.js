// src/models/Innovation.js
class Innovation {
    constructor({
      ID,
      name_innovation,
      description,
      cost,
      details_innovation,
      image,
      video,
      publish_Date,
      create_by,
      cate_ID,
    }) {
      this.ID = ID;
      this.name_innovation = name_innovation;
      this.description = description;
      this.cost = cost;
      this.details_innovation = details_innovation;
      this.image = image;
      this.video = video;
      this.publish_Date = publish_Date;
      this.create_by = create_by;
      this.cate_ID = cate_ID;
    }
  
    static Add(data) {
      // API call to add innovation
    }
  
    static Edit(ID, data) {
      // API call to edit innovation
    }
  
    static Delete(ID) {
      // API call to delete innovation
    }
  
    static Search(name_innovation) {
      // API call to search innovation by name
    }
  }
  
  export default Innovation;
  