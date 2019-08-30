import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
//import { Note } from '../note/note';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { Note } from '../note';
import { category } from '../category';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  categories: Array<category>;
  private url: String;

  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private authservice: AuthenticationService, private httpClient: HttpClient) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
    this.url = 'http://localhost:8082/api/v1/note/';
  }

  fetchNotesFromServer() {
    console.log("inside fectchNotesFromServer ");
    const url1 = `  ${this.url}${localStorage.getItem("userId")}`;
    console.log("url", url1);
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')
    .set('Authorization',`Bearer ${localStorage.getItem('bearerToken')}`).set('responseType','text');
    return this.httpClient.get<Note[]>(url1, {
     //headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
     headers : headers
    }).subscribe(notes => {

      this.notes = notes;
      this.notesSubject.next(this.notes);
      console.log("notes11111111111111 ", notes);
    },
      (err: any) => {
        console.log("errorrrrrrrrrr ",err);
        this.notesSubject.error(err);
      })
  }



  getNotes(): BehaviorSubject<Array<Note>> {

    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    let authHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('bearerToken'),
      'Content-Type': 'application/json; charset=utf-8'
    });
    


    note.noteCreatedBy = localStorage.getItem("userId");

    return this.httpClient.post<Note>('http://localhost:8082/api/v1/note', note, {
      headers: authHeader
    }).pipe(tap(addedNote => {

      this.notes.push(addedNote);
       this.notesSubject.next(this.notes);
      //this.fetchNotesFromServer();
    }))
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:8082/api/v1/note/${localStorage.getItem('userId')}/${note.noteId}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedNote => {
      console.log("editedNote ", editedNote);
      const note = this.notes.find(note => note.noteId == editedNote.noteId);
      Object.assign(note, editedNote);
      this.notesSubject.next(this.notes);
    }))
  }


  deleteNote(note: Note): Observable<Note> {
    return this.httpClient.delete<Note>(`http://localhost:8082/api/v1/note/${localStorage.getItem('userId')}/${note.noteId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(deletedNote => {
      this.notes.splice(this.notes.indexOf(note), 1);
      //const note = this.notes.find(note => note.noteId == deletedNote.noteId);
      //Object.assign(note,deletedNote);
      this.notesSubject.next(this.notes);
    }))
  }


  getNoteById(noteId): Note {
    const foundnote = this.notes.find(note => note.noteId == noteId);
    return foundnote;
  }
}
