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

  const decoded: any = jwtDecode(token);
  const expectedRole = route.data['expectedRole'];

  // Normalize role: remove "ROLE" prefix and lowercase
  const actualRole = decoded.role?.replace('ROLE', '').toLowerCase();



  return true;
};

