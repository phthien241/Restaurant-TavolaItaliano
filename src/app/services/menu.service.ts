import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';
import { Subject, map } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private food: Food[] = [];
  private foodUpdated = new Subject<Food[]>();

  constructor(private http: HttpClient) { }
  getMenu(){
    this.http.get<{food:any}>("http://localhost:3000/api/menu").pipe(map(data=>{
      return data.food.map(food=>{
        return{
          id : food.id,
          title : food.title,
          description: food.description,
          price: food.price,
          isValid: food.isValid,
          imageUrl: food.imageUrl
        }
      })
    })).subscribe(transformedData=>{
      this.food = transformedData;
      this.foodUpdated.next([...this.food]);
    })
  }

  addMenu(food: any){
    this.http.post<{message:string}>("http://localhost:3000/api/menu/add-menu",food).subscribe(response=>{
      console.log(response.message);
    })
  }

  getFoodUpdatedListener(){
    return this.foodUpdated.asObservable();
  }

}
