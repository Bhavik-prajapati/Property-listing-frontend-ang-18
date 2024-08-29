import { HttpInterceptorFn } from '@angular/common/http';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(clonedReq)  
    return next(clonedReq);
  } else {
    return next(req);
  }
};
