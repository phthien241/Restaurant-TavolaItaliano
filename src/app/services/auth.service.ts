import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  message: string = "";
  tokenExpired = new Subject<any>();
  firstNameChange = new Subject<any>();
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private dialog: MatDialog) {
    if (localStorage.getItem("authToken")) {
      setTimeout(() => {
        this.tokenExpired.next({ expired: true });
      }, parseInt(localStorage.getItem("expiresIn")));
    }
    this.tokenExpiredUpdated();
  }

  isAuthenticated = () => {
    if (!localStorage.getItem("authToken") || this.jwtHelper.isTokenExpired(localStorage.getItem("authToken"))) {
      return false;
    }
    return true;
  }
  signUp(email: string, password: string, firstName: string, lastName: string) {
    const user = { email: email.toLowerCase(), password: password, firstName: firstName, lastName: lastName }
    this.http.post<{ message: string }>("http://localhost:3000/api/user/sign-up", user).subscribe({
      next: response => {
        this.message = response.message;
        console.log(this.message);
      },
      error: err => {
        this.message = err.error.message;
        this.dialog.open(DialogComponent,{
          data:"FEmail already exists"
        })
      },
      complete: () => {

      },
    })
  }
  signIn(email: string, password: string) {
    this.dialog.open(DialogComponent,{
      data:"Please wait..."
    })
    this.http.post<{ isAdmin: Boolean, imageUrl: string, message: string, token: string, firstName: string }>("http://localhost:3000/api/user/sign-in", { email: email, password: password }).subscribe({
      next: response => {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("fname", response.firstName);
        localStorage.setItem("email", email);
        localStorage.setItem("imageUrl", response.imageUrl);
        localStorage.setItem("isAdmin", String(response.isAdmin));
        this.jwtHelper.getTokenExpirationDate(response.token).getTime() - new Date().getTime();
        localStorage.setItem("expiresIn",(this.jwtHelper.getTokenExpirationDate(response.token).getTime() - new Date().getTime()).toString())
        setTimeout(() => {
          this.tokenExpired.next({ expired: true });
        }, parseInt(localStorage.getItem("expiresIn")));
        this.firstNameChange.next({ fname: response.firstName, imageUrl: response.imageUrl });
        this.message = response.message;
        this.dialog.closeAll();
      },
      error: err => {
        this.message = err.error.message;
        this.dialog.closeAll();
        this.dialog.open(DialogComponent,{
          data:"FInvalid email or password"
        })
      },
      complete: () => {
        this.router.navigate([""]);
      }
    })
  }

  logOut() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("fname");
    localStorage.removeItem("email");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("isAdmin");
  }

  tokenExpiredUpdated() {
    this.tokenExpired.asObservable().subscribe({
      next: response => {
        this.logOut();
      }
    })
  }
}
