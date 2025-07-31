import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const connectedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('authtoken');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
