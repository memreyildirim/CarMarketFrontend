import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {jwtDecode} from "jwt-decode";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');


  if (!token) {
    router.navigate(['/login-screen']);
    return false;
  }


  return true;
};

