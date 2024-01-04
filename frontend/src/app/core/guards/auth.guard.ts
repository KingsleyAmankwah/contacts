import { inject } from '@angular/core';
import { cookie } from '../utils';
import { Router } from '@angular/router';

export function authGuard() {
  let route = inject(Router);

  let authToken = cookie.get('auth_token');

  if (!authToken) {
    return route.navigate(['/sign-in']);
  } else {
    return route.navigate(['/contacts']);
  }
}
