import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { cookie } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class ContactGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let authToken = cookie.get('auth_token');

    if (authToken) {
      // User is authenticated, allow access to route
      return true;
    } else {
      // No user token found, redirect to sign-in
      this.router.navigate(['/auth/sign-in']);
      return false;
    }
  }
}
