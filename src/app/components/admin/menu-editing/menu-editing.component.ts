import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-editing',
  templateUrl: './menu-editing.component.html',
  styleUrls: ['./menu-editing.component.scss']
})
export class MenuEditingComponent {
  image: File
  constructor(private menuService: MenuService){}

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
    formData.append("description", form.value.description);
    formData.append("price", form.value.price);
    formData.append("isValid", isValid);
    formData.append("course", form.value.course);
    formData.append("image", this.image);
    this.menuService.addMenu(formData);

  }
}

