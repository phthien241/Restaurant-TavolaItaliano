import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  {
    path: "menu", loadChildren: () => import('./components/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: "admin", loadChildren: () => import('./components/admin/menu-editing/menu-editing.module').then(m => m.MenuEditingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
