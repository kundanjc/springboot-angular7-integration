import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit{
  noteId:number;

  constructor(private dialog:MatDialog,
    private activatedRoute:ActivatedRoute,
    private routerService:RouterService) 
    { 
      this.activatedRoute.params.subscribe(params =>
        this.noteId=params.noteid);

        this.dialog.open(EditNoteViewComponent,{
          data:{
            note:this.noteId
          }
        })
    }

  ngOnInit() {
  }
}
