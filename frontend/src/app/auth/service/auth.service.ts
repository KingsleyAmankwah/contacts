import { Injectable, inject } from '@angular/core';
import { cookie } from '../../core/utils';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private authToken = cookie.get('auth_token');

  router = inject(Router);
  http = inject(HttpClient);

  user: authenticatedUser | null = this.authToken
    ? jwtDecode(this.authToken)
    : null;

  setUser(user: authenticatedUser) {
    this.user = user;
  }

  handleAuthResponse(token: string) {
    cookie.set({ days: 28, name: 'auth_token', value: token });
    this.setUser(jwtDecode(token));
    this.router.navigateByUrl('/contact/list', { replaceUrl: true });
  }

  signUp(userData: SignUpData): Observable<userResponse> {
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
  signIn(userData: SignInData): Observable<userResponse> {
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

  onLogout() {
    this.user = null;
    cookie.remove('auth_token');
    this.router.navigateByUrl('/auth/sign-in');
  }
}
