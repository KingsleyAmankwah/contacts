import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { cookie } from '../utils';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = cookie.get('auth_token');
  const router = inject(Router);

  let cloneReq = req.clone({
    setHeaders: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });

  return next(cloneReq).pipe(
    catchError((error: HttpEvent<any>) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        let { error: { message = 'Error' } = {}, status } = error;
        let customEvent = new CustomEvent<{ status: number; message: string }>(
          'httperror',
          {
            detail: {
              status,
              message,
            },
          }
        );
        document.dispatchEvent(customEvent);
        router.navigate(['/auth/sign-in']);
      }

      throw error;
    })
  );
};
