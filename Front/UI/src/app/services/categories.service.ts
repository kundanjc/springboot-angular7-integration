import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { category } from '../category';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class CategoriesService {
  categories: Array<category>;
  categoriesSubject: BehaviorSubject<Array<category>>;

  constructor(private authservice: AuthenticationService, private httpClient: HttpClient) {
    this.categories = [];
    this.categoriesSubject = new BehaviorSubject([]);

  }

  fetchCategoriesFromServer() {
    console.log("inside fectchCategoriesFromServer ");
    return this.httpClient.get<category[]>('http://localhost:8083/api/v1/category/' + localStorage.getItem('userId'), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(categories => {
      this.categories = categories;
      this.categoriesSubject.next(this.categories);
    },
      (err: any) => {
        this.categoriesSubject.error(err);
      })
  }


  getCategories(): BehaviorSubject<Array<category>> {
    return this.categoriesSubject;
  }

  addCategory(cat: category): Observable<category> {
    let authHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('bearerToken'),
      'Content-Type': 'application/json; charset=utf-8'
    });
    console.log("cat: ", cat);
    console.log("local stordage userid " + localStorage.getItem("userId"));
    cat.categoryCreatedBy = localStorage.getItem("userId");
    return this.httpClient.post<category>('http://localhost:8083/api/v1/category', cat, {

      headers: authHeader
    }).pipe(tap(addedCategory => {
      console.log("addedNote ", addedCategory);
      this.categories.push(cat);
      this.categoriesSubject.next(this.categories);
    }))
  }

  editCategory(cat: category): Observable<category> {
    return this.httpClient.put<category>(`http://localhost:8083/api/v1/category/${cat.categoryId}`,cat, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedNote => {
      console.log("editedNote ", editedNote);
      const cat = this.categories.find(note => cat.categoryId == editedNote.categoryId);
      Object.assign(cat, editedNote);
      this.categoriesSubject.next(this.categories);
    }))
  }


  deleteCategory(cat: category): Observable<category> {
    return this.httpClient.delete<category>(`http://localhost:8083/api/v1/category/${cat.categoryId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(deletedcategory => {
      console.log("inside pipe of delet category ",this.categories);
      console.log("inside pipe of delet category ",deletedcategory);
      console.log("inside pipe of delet category ",cat);
      this.categories.splice(this.categories.indexOf(cat), 1);
      this.categoriesSubject.next(this.categories);
    }))
  }


  getCategoryById(categoryId): category {
    const foundnote = this.categories.find(cat => cat.categoryId == categoryId);
    return foundnote;
  }
}




