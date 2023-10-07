import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Carousel, initTE,Ripple, Input} from 'tw-elements';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  message: string =""
  constructor(private authService: AuthService){}
  signUp(form: NgForm){
    this.authService.signUp(form.value.email, form.value.password, form.value.firstName, form.value.lastName);
    form.reset();
  }
  ngOnInit() {
    initTE({ Carousel,Ripple, Input });
  }
}
