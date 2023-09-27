import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  message: string = "";
  
  constructor(private http: HttpClient, private router: Router, private jwtHelper : JwtHelperService ) { }

  isAuthenticated = () => {
    if(!localStorage.getItem("authToken") || this.jwtHelper.isTokenExpired(localStorage.getItem("authToken"))){
      return false;
    }
    return true;
  }
  signUp(email: string, password: string, firstName: string, lastName: string) {
    const user = { email: email.toLowerCase(), password: password, firstName: firstName, lastName: lastName }
    this.http.post<{ message: string }>("http://localhost:3000/api/user/sign-up", user).subscribe({
      next: response => {
        this.message = response.message;
      },
      error: err => {
        this.message = err.error.message;
      },
      complete: () => {

      },
    })
  }


  signIn(email: string, password: string) {
    this.http.post<{imageUrl: string, message: string,token:string, firstName: string }>("http://localhost:3000/api/user/sign-in", { email: email, password: password }).subscribe({
      next: response => {
        localStorage.setItem("authToken",response.token);
        localStorage.setItem("fname", response.firstName);
        localStorage.setItem("email",email);
        localStorage.setItem("imageUrl",response.imageUrl);
        this.message = response.message;
      },
      error: err => {
        this.message = err.error.message;
      },
      complete: () => {
        this.router.navigate([""]).then(()=>{
          window.location.reload();
        });
      }
    })
  }
}
