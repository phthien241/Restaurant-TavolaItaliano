import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuEditingComponent } from './menu-editing.component';

const routes: Routes = [
  {
    path: '',
    component: MenuEditingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuEditingRoutingModule { }
