import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-editing',
  templateUrl: './menu-editing.component.html',
  styleUrls: ['./menu-editing.component.scss']
})
export class MenuEditingComponent implements OnInit {
  title:string;
  course:string;
  price: number;
  available: string;
  description: string;
  image: File
  constructor(private menuService: MenuService, private route: ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe(params=>{
        const food = params["food"];
        if(food == ""){
          return;
        }
        this.menuService.getFoodInformation(food);
        this.menuService.getDishUpdatedListener().subscribe({
          next: response=>{
            console.log(response);
            this.title=response.title;
            this.course = response.course;
            this.price = response.price;
            this.available = response.available;
            this.description = response.description;
          }
        })
      })
  }

  onFileChange($event:any){
    this.image = $event.target.files[0];
  }
  
  onSubmitForm(form: NgForm){
    let formData = new FormData();
    
    let isValid;
    if(form.value.available==="A"){
      isValid = true;
    }else{
      isValid = false;
    }
    formData.append("title", form.value.title);
    console.log(form.value.title);
    formData.append("description", form.value.description);
    formData.append("price", form.value.price);
    formData.append("isValid", isValid);
    formData.append("course", form.value.course);
    formData.append("image", this.image);
    this.menuService.addMenu(formData);
  }
}

