import { HttpInterceptorFn } from '@angular/common/http';

export const httpJwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authtoken');

  if (token) {
    const reqClone = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + token),
    });
    return next(reqClone);
  }

  return next(req);
};
