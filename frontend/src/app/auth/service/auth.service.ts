import { Injectable, inject } from '@angular/core';
import { cookie } from '../../core/utils';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import {
  authenticatedUser,
  SignInData,
  SignUpData,
  userResponse,
} from '../Interface';
import { USER_URL } from '../../core/constants/apiEndpoints';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Get the auth token from the cookie
  private authToken = cookie.get('auth_token');

  // Inject the Router and HttpClient services
  router = inject(Router);
  http = inject(HttpClient);

  // Decode the auth token to get the user details
  user: authenticatedUser | null = this.authToken
    ? jwtDecode(this.authToken)
    : null;

  // Set the current user details
  setUser(user: authenticatedUser) {
    this.user = user;
  }

  // Sign up a new user
  signUp(userData: SignUpData) {
    return this.http.post<userResponse>(`${USER_URL}/sign-up`, userData).pipe(
      tap({
        next: ({ data: { token } }) => {
          this.handleAuthResponse(token);
        },
        error: (error) => {
          console.error('Error during sign up:', error);
        },
      })
    );
  }

  // Sign in an existing user
  signIn(userData: SignInData) {
    return this.http.post<userResponse>(`${USER_URL}/sign-in`, userData).pipe(
      tap({
        next: ({ data: { token } }) => {
          this.handleAuthResponse(token);
        },
        error: (error) => {
          console.error('Error during sign up:', error);
        },
      })
    );
  }

  // Handle the auth response by setting the cookie and user data
  handleAuthResponse(token: string) {
    cookie.set({ hours: 1, name: 'auth_token', value: token });
    this.setUser(jwtDecode(token));
    this.router.navigateByUrl('/contact/list', { replaceUrl: true });
  }

  // Log out the current user
  onLogout() {
    this.user = null;
    cookie.remove('auth_token');
    this.router.navigateByUrl('/auth/sign-in');
  }
}
