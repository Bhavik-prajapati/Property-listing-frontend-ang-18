import { HttpInterceptorFn } from '@angular/common/http';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshtoken");

  let headers = {};

if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
  }

  if (refreshToken) {
    headers = {
      ...headers,
      'x-refresh-token': refreshToken
    };
  }

  // Clone the request and add headers
  const clonedReq = req.clone({
    setHeaders: headers
  });

  return next(clonedReq);

};
