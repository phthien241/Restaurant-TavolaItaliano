import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  userUpdated = new Subject<any>();
  constructor(private http: HttpClient) { }

  updateProfile(user: any) {
    this.http.post<{newProfile: any}>("http://localhost:3000/api/user/set-profile", user).subscribe({
      next: response => {
        localStorage.setItem("fname",user.firstName);
      }, error: err => {

      }, complete: () => {

      }
    })
  }

  updateAvatar(email: string, image: File) {
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('image', image);
    this.http.post("http://localhost:3000/api/user/update-avatar", formData).subscribe({
    })
  }

  getProfile(email: string) {
    this.http.post<{ user: any }>("http://localhost:3000/api/user/get-profile", { email: email }).subscribe({
      next: response => {
        this.user = response.user;
        this.userUpdated.next(this.user);
      },
      error: err => {

      },
      complete: () => {

      }
    })
  }

  userUpdatedListener() {
    return this.userUpdated.asObservable();
  }

}
