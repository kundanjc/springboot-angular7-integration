//import { Component } from '@angular/core';
//import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
//import { User } from './user';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //private user:User;
  loginForm: FormGroup;
  private bearerToken: string;
  public submitMessage: string;
  userId = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]))

  constructor(private authService: AuthenticationService,
    private routerService: RouterService, private formbuilder: FormBuilder) {
    this.submitMessage = "";
    //this.user = new User();
    this.loginForm = formbuilder.group({
      userId: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    })
  }

  ngOnInit() {
  }

  onRegister(){
    this.routerService.routeToRegister();
  }

  loginSubmit() {
    this.authService.authenticateUser({
      userId: this.userId.value,
      userPassword: this.password.value
    }).subscribe(

      res => {
        console.log("response got from spring "+JSON.stringify(res));
        this.bearerToken = res['token']; 
        
        this.authService.setBearerToken(this.bearerToken);
        this.authService.setUserId(this.userId.value);
        this.routerService.routeToDashboard();
        
      },
      err => {
       
          this.submitMessage = err.error;
        
        console.log("response got from spring ",err);
      })
  }
}