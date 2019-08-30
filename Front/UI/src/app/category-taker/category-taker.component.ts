import { Component, OnInit } from '@angular/core';
import { category } from '../category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-taker',
  templateUrl: './category-taker.component.html',
  styleUrls: ['./category-taker.component.css']
})
export class CategoryTakerComponent implements OnInit {

  public cat: category;
  
  errMessage: string;
  public category : category;
  
  constructor(private categoryService:CategoriesService) {
    this.cat = new category();
    
   // this.categoryService.fetchcategoriesFromServer(localStorage.getItem("userId"));
  }
  
  ngOnInit(){

  }
  addCategory() {
    //this.noteList.push(this.note);
    //console.log(this.note);

    if (this.cat.categoryId !== '' && this.cat.categoryName !== '' 
      && this.cat.categoryDescription !== '' ){
      this.categoryService.addCategory(this.cat).subscribe(
        data => { console.log("inside data of addcatgeory ",data)},
        err => {
          console.log("err object in addCategory ",err);
          this.errMessage = err.error;
          ;
        }
      )
      this.cat = new category();
    }
    else {
      this.errMessage = "All the fields are required.. Please fill and continue";
    }
  }
}
