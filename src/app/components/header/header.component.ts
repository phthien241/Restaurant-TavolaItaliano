import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstName = "";
  imageUrl ="";
  constructor(private authService: AuthService, private userService: UserService){}
  ngOnInit(): void {
      if(this.authService.isAuthenticated()){
        this.firstName = localStorage.getItem("fname");
        this.imageUrl = localStorage.getItem("imageUrl");
      }
  }
}
