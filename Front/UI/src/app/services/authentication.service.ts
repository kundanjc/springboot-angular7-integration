import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../note';
import { map } from 'rxjs/operators/map';


@Injectable()
export class AuthenticationService {

  private authUrl: string;
  constructor(private httpClient: HttpClient) {
    this.authUrl = 'http://localhost:3000/auth/v1/';
  }

  authenticateUser(data) {
    console.log("user data "+data);
    return this.httpClient.post<any>('http://localhost:8089/api/v1/auth/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  setUserId(userid){
    localStorage.setItem("userId",userid);
  }

  getUserId(){
    return localStorage.getItem("userId");
  }
  
  isUserAuthenticated(token): Promise<boolean> {
    //console.log("token in isUserAuthenticated Mthod "+token + " this.getBearerToken(): in "+this.getBearerToken());
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.authUrl + 'isAuthenticated', '', {
        headers: {
          'Authorization': 'Bearer ' + this.getBearerToken()
        }
      }).subscribe((res: any) => {
        console.log("Response ", res)
        resolve(res['isAuthenticated']);
      },
        err => {
          reject(err);
        });
    });
  }

  register(userData){
    console.log("inside userData "+JSON.stringify(userData));
    return this.httpClient.post("http://localhost:8089/api/v1/auth/register",userData);
  }

  login(userData){
    return this.httpClient.post('http://localhost:8089/api/v1/auth/login',userData,{
    }).pipe(map(userDetails =>{
      console.log("userDetails "+userDetails);
      
    }))
  }

  logout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("bearerToken");
  }

}
