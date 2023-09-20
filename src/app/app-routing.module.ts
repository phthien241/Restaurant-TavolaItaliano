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
  },
  {
    path: "admin/login", loadChildren: () => import('./components/admin/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "login", loadChildren: () => import('./components/users/user-login/user-login.module').then(m => m.UserLoginModule)
  },
  {
    path: "profile", loadChildren: () => import('./components/users/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: "reservation", loadChildren: () => import('./components/users/reservation/reservation.module').then(m => m.ReservationModule)
  },
  {
    path: "reservationmanagement", loadChildren: () => import('./components/admin/management/reservation-management/reservation-management.module').then(m => m.ReservationManagementModule)
  },
  {
    path: "reservationhistory", loadChildren: () => import('./components/users/reservation-history/reservation-history.module').then(m => m.ReservationHistoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
