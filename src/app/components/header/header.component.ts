import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  homeClass = "home bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
  menuClass = "menu text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
  firstName: string
  imageUrl: string
  isAdmin: Boolean
  dropdownOpen: Boolean;
  constructor(private authService: AuthService, private userService: UserService, private router: Router, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.dropdownOpen = false;
    this.isAdmin = (localStorage.getItem("isAdmin")=="true");
    this.firstName = localStorage.getItem("fname");
    this.imageUrl = localStorage.getItem("imageUrl");
    this.authService.firstNameChange.subscribe({
      next: response => {
        this.firstName = response.fname;
        this.imageUrl = response.imageUrl;
        this.isAdmin = (localStorage.getItem("isAdmin")=="true");
      }
    });
  }
  logOut() {
    this.authService.logOut();
    this.firstName = "";
    this.imageUrl = "";
    this.router.navigate(["/login"]);
  }
  onClickMenu() {
    this.router.navigate(["menu"]);
    this.menuClass = "menu bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
    this.homeClass = "home text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
  }
  onClickHome() {
    this.router.navigate([""]);
    this.homeClass = "home bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
    this.menuClass = "menu text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
  }
  navigateProfile(){
    this.router.navigate(["profile"])
  }
  navigateReservation(){
    this.router.navigate(["reservationhistory"]);
  }
  navigateAddMenu(){
    this.router.navigate(["admin/menu/add"])
  }
  navigateReservationManagement(){
    this.router.navigate(["admin/reservation/management"])
  }
  toggleDropdown(){
    this.dropdownOpen = !this.dropdownOpen;
  }
}
