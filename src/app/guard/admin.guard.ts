import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  let isAdmin = (localStorage.getItem("isAdmin")=="true");
  if(isAdmin){
    return true;
  }else{
    router.navigate(['/error']);
    return false;
  }
};
