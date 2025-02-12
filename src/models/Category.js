// src/models/Category.js
class Category {
    constructor({ Category_ID, Name_Category, Publish_Date, Create_by }) {
      this.Category_ID = Category_ID;
      this.Name_Category = Name_Category;
      this.Publish_Date = Publish_Date;
      this.Create_by = Create_by;
    }
  
    static Add(data) {
      // API call to add category
    }
  
    static Edit(Category_ID, data) {
      // API call to edit category
    }
  
    static Delete(Category_ID) {
      // API call to delete category
    }
  
    static Search(query) {
      // API call to search by Name_Category or Category_ID
    }
  }
  
  export default Category;
  