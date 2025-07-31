import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      console.error('Error interceptor', error);

      switch (error.status) {
        case 401:
          router.navigate(['/login']);
          return throwError(() => null);

        /*
        case 403:
          TODO rediriger sur une page "tu n'as pas le droit d'etre la..."
          */
      }

      return throwError(() => error);
    })
  );
};
