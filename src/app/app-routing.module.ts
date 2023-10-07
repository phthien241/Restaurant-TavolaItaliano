import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { ErrorComponent } from './components/error/error.component';
import { adminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  {path:"error",component: ErrorComponent},
  {
    path: "menu", loadChildren: () => import('./components/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: "admin/menu/add", loadChildren: () => import('./components/admin/menu-editing/menu-editing.module').then(m => m.MenuEditingModule), canActivate: [adminGuard]
  },
  {
    path: "admin/menu/edit/:food", loadChildren: () => import('./components/admin/menu-editing/menu-editing.module').then(m => m.MenuEditingModule), canActivate: [adminGuard]
  },
  {
    path: "admin/login", loadChildren: () => import('./components/admin/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "login", loadChildren: () => import('./components/users/user-login/user-login.module').then(m => m.UserLoginModule)
  },
  {
    path: "profile", loadChildren: () => import('./components/users/profile/profile.module').then(m => m.ProfileModule), canActivate: [authGuardGuard]
  },
  {
    path: "reservation", loadChildren: () => import('./components/users/reservation/reservation.module').then(m => m.ReservationModule), canActivate:[authGuardGuard]
  },
  {
    path: "admin/reservation/management", loadChildren: () => import('./components/admin/management/reservation-management/reservation-management.module').then(m => m.ReservationManagementModule), canActivate: [adminGuard]
  },
  {
    path: "reservationhistory", loadChildren: () => import('./components/users/reservation-history/reservation-history.module').then(m => m.ReservationHistoryModule), canActivate:[authGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
