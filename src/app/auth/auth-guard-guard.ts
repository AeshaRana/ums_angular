import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './login/auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const authService=inject(AuthService);

  if(! authService.isLoggedIn())
  {
    router.navigate(['/login'])
    return false
  }
  return true;
};
