import { Injectable, inject } from '@angular/core';
import { cookie } from '../../../core/utils';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { IUser, SignInData, SignUpData, SignUpResponse } from '../Interface';
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
    this.router.navigateByUrl('/contacts', { replaceUrl: true });
  }

  // Method to handle sign in.
  signIn(data: SignInData) {
    // Post the sign-in data to the server.
    this.http
      .post<{ message: string; data: { token: string } }>(
        `${USER_URL}/sign-in`,
        data
      )
      .subscribe(({ data: { token } }) => {
        // Handle the authentication response with the received token.
        this.handleAuthResponse(token);
      });
  }

  // Method to handle sign up.
  // signUp(data: SignUpData) {
  //   // Post the sign-up data to the server.
  //   this.http
  //     .post<{ message: string; data: { token: string } }>(
  //       `${USER_URL}/sign-up`,
  //       data
  //     )
  //     .subscribe(({ data: { token } }) => {
  //       // Handle the authentication response with the received token.
  //       this.handleAuthResponse(token);
  //     });
  // }

  // signUp(userData: SignUpData): Observable<SignUpResponse> {
  //  return this.http
  //     .post<SignUpResponse>(`${USER_URL}/sign-up`, userData)
  //     .subscribe(({ data: { token } }) => {
  //       this.handleAuthResponse(token);
  //     });
  // }

  signUp(userData: SignUpData): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${USER_URL}/sign-up`, userData).pipe(
      tap(({ data: { token } }) => {
        this.handleAuthResponse(token);
      })
    );
  }
}
