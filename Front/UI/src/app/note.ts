import { category } from "./category";

/* export class Note {
  id: Number;
  title: string;
  text: string;
  state: string;

  constructor() {
    this.title = '';
    this.text = '';
    this.state = 'not-started';
  }
} */
export class Note {
  noteId: Number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteCreatedBy : string;
  category : category;
  
  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteStatus = 'not-started';
    this.noteCreatedBy = '';
    this.category = null;
  }
}