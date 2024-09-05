import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    if (state.url === '/login' || state.url === '/signup') {
      router.navigateByUrl('home');
      return false;
    }
    return true; 
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
