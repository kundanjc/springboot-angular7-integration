import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import { category } from '../category';
import {CategoriesService} from '../services/categories.service';
@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  public note: Note;
  categories: Array<category>;
  errMessage: string;
  public category : category;
  
  constructor(private noteService: NotesService,private categoryService:CategoriesService) {
    this.note = new Note();
    this.categories = [];
   this.categoryService.fetchCategoriesFromServer();
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
      },err => {

      }

    )
  }


  addNote() {
    //this.noteList.push(this.note);
    //console.log(this.note);

    if (this.note.noteContent !== '' && this.note.noteTitle !== '' && 
     this.note.noteStatus !== '' && this.note.category != null) {
      this.noteService.addNote(this.note).subscribe(
        data => { },
        err => {
          this.errMessage = err.error;
          ;
        }
      )
      this.note = new Note();
    }
    else {
      this.errMessage = "Please fill all the mandatory fields";
    }
  }

  
}