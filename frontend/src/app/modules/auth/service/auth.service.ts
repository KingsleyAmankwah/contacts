import { Injectable, inject } from '@angular/core';
import { cookie } from '../../../core/utils';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { IUser, SignInData, SignUpData, userResponse } from '../Interface';
import { USER_URL } from '../../../core/constants/apiEndpoints';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = cookie.get('auth_token');

  router = inject(Router);
  http = inject(HttpClient);

  // Define the user property. Decode the authToken if it exists, or set it to null.
  user: IUser | null = this.authToken ? jwtDecode(this.authToken) : null;

  // Method to update the user property.
  setUser(user: IUser) {
    this.user = user;
  }

  // Method to handle the authentication response, typically after sign in or sign up.
  handleAuthResponse(token: string) {
    // Set the auth_token cookie with the received token.
    cookie.set({ days: 28, name: 'auth_token', value: token });

    // Update the user property by decoding the received token.
    this.setUser(jwtDecode(token));

    // Navigate to the contact list page.
    this.router.navigateByUrl('/contact/list', { replaceUrl: true });
  }

  signUp(userData: SignUpData): Observable<userResponse> {
    return this.http.post<userResponse>(`${USER_URL}/sign-up`, userData).pipe(
      tap({
        next: ({ data: { token } }) => {
          this.handleAuthResponse(token);
        },
        error: (error) => {
          // Handle error scenario here if needed.
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
          // Handle error scenario here if needed.
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
