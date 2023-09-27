import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imageUrl: string;
  file: File;
  isLoading = true;
  user:any
  onFileSelected($event: any) {
    this.file = $event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file);
    }
  }
  constructor(private userService: UserService) { }

  onSubmit(form:NgForm){
    const profile = {email: localStorage.getItem("email"),firstName: form.value.firstName, lastName: form.value.lastName}
    this.userService.updateProfile(profile)
    if(form.value.imageUrl){
      this.userService.updateAvatar(localStorage.getItem("email"), this.file)
    }
  }

  ngOnInit(): void {
    this.userService.getProfile(localStorage.getItem("email"));
    this.userService.userUpdatedListener().subscribe(user => {
      this.user = user
      this.imageUrl = user.imageUrl;
      this.isLoading = false;
    })
  }
}
