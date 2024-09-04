import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const http = inject(HttpClient);
  const router = inject(Router);

  // If on login or signup page, check if the user is already authenticated
  if (state.url === '/login' || state.url === '/signup') {
    if (token) {
      // If user is logged in, redirect to home page
      return http.get('http://localhost:5000/users/checkauth').pipe(
        map((res: any) => {
          if (res.loggedIn) {
            router.navigateByUrl('home');
            return false; // Prevent navigation to login/signup
          }
          return true; // Allow navigation to login/signup
        }),
        catchError((err) => {
          console.error('Auth check failed', err);
          return of(true); // Allow navigation if there's an error
        })
      );
    } else {
      // If no token, allow access to login/signup
      return of(true);
    }
  }

  // For other routes, check if the user is authenticated
  return http.get('http://localhost:5000/users/checkauth').pipe(
    map((res: any) => {
      if (res.loggedIn) {
        return true; // Allow navigation if authenticated
      } else {
        router.navigateByUrl('login');
        return false; // Prevent navigation if not authenticated
      }
    }),
    catchError((err) => {
      console.error('Auth check failed', err);
      router.navigateByUrl('login');
      return of(false); // Prevent navigation on error
    })
  );
};
