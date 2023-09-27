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
  constructor(private menuService: MenuService, private router: Router){}
  ngOnInit(): void {
      this.menuService.getMenu();
      this.menuService.getFoodUpdatedListener().subscribe((food: Food[])=>{
        this.food = food;
      })
  }

  editMenu(food: string){
    this.router.navigate(["admin/menu/edit",food])
  }
}
