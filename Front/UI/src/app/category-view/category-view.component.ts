import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { category } from '../category';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  categories: Array<category>;
  constructor(private categoryservice: CategoriesService) { }

  ngOnInit() {
    this.categoryservice.getCategories().subscribe(
      res =>{
          this.categories = res;
      },
      err =>{
          
      })
    }

  }


