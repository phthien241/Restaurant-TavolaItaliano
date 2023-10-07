import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  success:Boolean
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    if(data.substring(data.length-3)==="..."){
      this.success = false;
    }else{
      this.success = true;
    }
    
  }
}
