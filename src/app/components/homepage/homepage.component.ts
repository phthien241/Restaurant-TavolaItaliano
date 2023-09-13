import { Component } from '@angular/core';
import {Carousel, initTE,Ripple, Input} from 'tw-elements';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  ngOnInit() {
    initTE({ Carousel,Ripple, Input });
  }
}
