import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from './note/note.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatSelectModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { Routes, RouterModule } from '@angular/router';
import { NotesService } from './services/notes.service';
import {CategoriesService } from './services/categories.service';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { CategoryTakerComponent } from './category-taker/category-taker.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { EditCategoryOpenerComponent } from './edit-category-opener/edit-category-opener.component';
import { EditCategoryViewComponent } from './edit-category-view/edit-category-view.component';
import {CategoryDisplayComponent} from './category-display/category-display.component';
import { MainnavComponent } from './mainnav/mainnav.component';
const routes: Routes = [

  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,
   // canActivate: [CanActivateRouteGuard],
    children: [
      { path: 'view/noteview', component: NoteViewComponent },
      { path: 'note/:noteid/edit', component: EditNoteOpenerComponent, outlet: 'noteEditOutlet' },
      { path: '', redirectTo: 'view/noteview', pathMatch: 'full' }
    ]
  },
  {path:'display-category',component:CategoryDisplayComponent,
    children:[
      {path:'view/categoryview',component:CategoryViewComponent},
      {path:'category/:categoryid/edit',component:EditCategoryOpenerComponent,outlet:'catEditOutlet'},
      {path:'',redirectTo:'view/categoryview',pathMatch:'full'},
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoteComponent,
    LoginComponent,
    NoteTakerComponent,
    NoteViewComponent,
    DashboardComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    ListViewComponent,
    RegisterComponent,
    CategoryComponent,
    CategoryTakerComponent,
    CategoryViewComponent,
    EditCategoryOpenerComponent,
    EditCategoryViewComponent,
    MainnavComponent,
    CategoryDisplayComponent
  ],
  imports: [
    BrowserModule,

    MatToolbarModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    RouterModule.forRoot(routes)
  ],
  providers: [NotesService, AuthenticationService, RouterService, 
    CanActivateRouteGuard,CategoriesService],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent,EditCategoryViewComponent]
})
export class AppModule { }
