import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
    this.categoryService.fetchCategoriesFromServer();
  }

}
