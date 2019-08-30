import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() note: Note;
  
    
    
  constructor(private routerService: RouterService) {
    console.log("Note in Hemanth",this.note);
   }
  ngOnInit() { }

  openEditView() {
    this.routerService.routeToEditNoteView(this.note.noteId);
  }
}
