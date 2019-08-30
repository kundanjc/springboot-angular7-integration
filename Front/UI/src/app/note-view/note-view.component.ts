import { Component } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {

  notes: Array<Note>;

  constructor(private noteService: NotesService) {
    this.notes = [];
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(
      res => {
        console.log("rrrrrrrrrrrrrr",res);
        this.notes = res;
        console.log("highjhjhjjks",this.notes);
      },
      err => { }
    );
  }
}
