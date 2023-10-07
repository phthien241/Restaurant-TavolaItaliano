import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  food: Food[] = [];
  appetizer: Food[] = [];
  main: Food[] = [];
  dessert: Food[] = [];
  isAdmin: Boolean;


  constructor(private menuService: MenuService, private router: Router) { }
  ngOnInit(): void {
    this.isAdmin = (localStorage.getItem("isAdmin") == "true");
    this.menuService.getMenu();
    this.menuService.getFoodUpdatedListener().subscribe((food: Food[]) => {
      this.appetizer = [];
      this.main = [];
      this.dessert = [];
      this.food = food;
      for (let food of this.food) {
        switch (food.course) {
          case 'appetizer':
            this.appetizer.push(food);
            break;
          case 'main':
            this.main.push(food);
            break;
          default:
            this.dessert.push(food);
            break;
        }
      }
    })
  }

  editMenu(food: string) {
    this.router.navigate(["admin/menu/edit", food])
  }

  deleteFood(food: string) {
    this.menuService.deleteFood(food);
  }
}
