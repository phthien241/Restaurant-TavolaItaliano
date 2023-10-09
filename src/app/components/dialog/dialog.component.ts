import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  success:string
  annoucement:string
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    if(data.substring(data.length-3)==="..."){
      this.success = "process";
      this.annoucement=data;
    }else{
      if(data[0]=='F'){
        this.success = "fail"
        this.annoucement = data.substring(1);
      }else{
        this.success = "success"
        this.annoucement=data
      }
    }
  }
}
