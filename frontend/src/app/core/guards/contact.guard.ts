import { inject } from '@angular/core';
import { cookie } from '../utils';
import { Router } from '@angular/router';

export function ContactGuard() {
  let route = inject(Router);

  let authToken = cookie.get('auth_token');

  if (authToken) {
    return route.navigate(['/contacts']);
  } else {
    return route.navigate(['/sign-in']);
  }
}
