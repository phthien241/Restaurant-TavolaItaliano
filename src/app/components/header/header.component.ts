import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstName = "haha";
  constructor(private authService: AuthService){}
  ngOnInit(): void {
      if(this.authService.isAuthenticated()){
        this.firstName = localStorage.getItem("fname");
      }
  }
}
