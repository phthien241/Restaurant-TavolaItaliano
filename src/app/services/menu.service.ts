import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';
import { Subject, map } from 'rxjs';
import { response } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private food: Food[] = [];
  private foodUpdated = new Subject<Food[]>();
  private dish: any;
  private dishUpdated = new Subject<any>();
  constructor(private http: HttpClient, private dialog: MatDialog) { }
  getMenu(){
    this.http.get<{food:any}>("http://localhost:3000/api/menu").pipe(map(data=>{
      return data.food.map(food=>{
        return{
          id : food.id,
          title : food.title,
          description: food.description,
          price: food.price,
          isValid: food.isValid,
          imageUrl: food.imageUrl,
          course: food.course
        }
      })
    })).subscribe(transformedData=>{
      this.food = transformedData;
      this.foodUpdated.next([...this.food]);
    })
  }

  getFoodInformation(food: string){
    this.http.post<{food:any}>("http://localhost:3000/api/menu/food",{food: food}).subscribe({
      next: response=>{
        this.dish = response
        this.dishUpdated.next(this.dish);
      }
    })
  }

  addMenu(food: any){
    this.dialog.open(DialogComponent,{
      data:"Adding food..."
    });
    this.http.post<{message:string}>("http://localhost:3000/api/menu/add-menu",food).subscribe(response=>{
      console.log(response.message);
      this.dialog.closeAll();
      this.dialog.open(DialogComponent,{
        data:"Add food successfully"
      });
    })
  }

  deleteFood(name: string){
    this.dialog.open(DialogComponent,{
      data:"Deleting..."
    });
    this.http.post<{message:string}>("http://localhost:3000/api/menu/delete",{name:name}).subscribe({
      next: response=>{
        this.getMenu()
        this.dialog.closeAll();
        this.dialog.open(DialogComponent,{
          data:"Delete successfully"
        })
      }
    })
  }

  getFoodUpdatedListener(){
    return this.foodUpdated.asObservable();
  }

  getDishUpdatedListener(){
    return this.dishUpdated.asObservable();
  }

}
