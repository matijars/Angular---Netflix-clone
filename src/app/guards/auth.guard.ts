import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const isLoginRoute = state.url === '/login';

  if (isLoggedIn && isLoginRoute) {
    router.navigate(['/']);
    return false;
  }

  if (!isLoggedIn && !isLoginRoute) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
