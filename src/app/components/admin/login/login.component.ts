import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService){}
  adminLogin(form:NgForm) {
    let email = form.value.email;
    if(email.substring(email.indexOf('@'))!="@tavolaitaliano.com.au"){
      return;
    }
    this.authService.signIn(email,form.value.password);
    form.reset();
  }

}
