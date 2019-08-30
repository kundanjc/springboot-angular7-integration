import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breakpoints } from '@angular/cdk/layout';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit {
  ngOnInit() {
    
  }

  public applicationTitle:string;
  public username:string;
  errMessage: string;
 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private userService:AuthenticationService
    ,private routerService : RouterService)
  {
    //this.user= new User();
      this.applicationTitle = "Welcome to Keep Note Application";


  }
  onLogout(){
    this.userService.logout();
    this.routerService.routeToLogin();
  }

  onCategory(){
    this.routerService.routeToCategoryDisplay();
  }

  onNotes(){
    this.routerService.routeToNoteView();
  }
  
  

}
