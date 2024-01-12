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

// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
// } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { cookie } from '../utils';

// @Injectable()
// export class authInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const authToken = cookie.get('auth_token');

//     let cloneReq = req.clone({
//       setHeaders: {
//         Authorization: authToken ? `Bearer ${authToken}` : '',
//       },
//     });

//     return next.handle(cloneReq).pipe(
//       catchError((error: any) => {
//         if (error instanceof HttpErrorResponse && error.status === 401) {
//           // Token expired or invalid, redirect to sign-in
//           this.router.navigate(['/auth/sign-in']);
//         }
//         throw error;
//       })
//     );
//   }
// }
