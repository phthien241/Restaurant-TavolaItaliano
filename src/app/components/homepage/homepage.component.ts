import { Component } from '@angular/core';
import {Carousel, initTE} from 'tw-elements';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  ngOnInit() {
    initTE({ Carousel });
  }
}
