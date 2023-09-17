import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  food: Food[] = [];
  constructor(private menuService: MenuService){}
  ngOnInit(): void {
      this.menuService.getMenu();
      this.menuService.getFoodUpdatedListener().subscribe((food: Food[])=>{
        this.food = food;
        console.log(this.food[0].title);
      })
  }
}
