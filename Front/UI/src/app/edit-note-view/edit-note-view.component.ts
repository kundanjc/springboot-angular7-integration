import { Component, Inject } from '@angular/core';
import { Note } from '../note';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  onSave() {
    this.noteService.editNote(this.note).subscribe((editedNote) => {
      this.matDialogRef.close();
      console.log("editedNote ",editedNote);
    },
    err => {
      this.matDialogRef.close();
      if (err.status === 404) {
        this.errMessage = err.error;
      }
      else {
        this.errMessage = err.error;
      }
    })
  }

  onDelete() {
    this.noteService.deleteNote(this.note).subscribe((editedNote) => {
      this.matDialogRef.close();
    },
    err => {
      this.matDialogRef.close();
      if (err.status === 404) {
        this.errMessage = err.error;
      }
      else {
        this.errMessage = err.error;
      }
    })
  }


  constructor(private matDialogRef: MatDialogRef<EditNoteViewComponent>,
    private routerService: RouterService,
    private noteService: NotesService,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.note);
  }

  ngOnDestroy() {
    this.routerService.routeToDashboard();
  }


}