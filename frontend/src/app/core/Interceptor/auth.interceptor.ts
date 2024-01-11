import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { cookie } from '../utils';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = cookie.get('auth_token');

  let cloneReq = req.clone({
    setHeaders: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });

  return next(cloneReq).pipe(
    catchError((event: HttpEvent<any>) => {
      if (event instanceof HttpErrorResponse) {
        let { error: { message = 'Error' } = {}, status } = event;

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
      }

      throw event;
    })
  );
};
