import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuEditingComponent } from './menu-editing.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MenuEditingRoutingModule } from './menu-editing-routing.module';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    MenuEditingComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MenuEditingRoutingModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MenuEditingModule { }
