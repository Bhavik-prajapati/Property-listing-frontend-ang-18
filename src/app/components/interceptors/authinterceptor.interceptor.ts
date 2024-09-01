import { HttpInterceptorFn } from '@angular/common/http';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = localStorage.getItem("token");
  // console.log("if called..........")
  // if (token) {
  //   const clonedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   return next(clonedReq);
  // } else {
  //   console.log("else called..........")
    return next(req);
  // }
};
