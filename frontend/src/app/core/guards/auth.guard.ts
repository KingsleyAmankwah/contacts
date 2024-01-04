import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { cookie } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authToken = cookie.get('auth_token');

    if (!authToken) {
      // No user token found, redirect to sign-in
      this.router.navigate(['/auth/sign-in']);
      return false;
    } else {
      // User is authenticated, allow access to route
      return true;
    }
  }
}
