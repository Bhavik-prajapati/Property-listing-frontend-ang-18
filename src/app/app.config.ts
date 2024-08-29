import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authinterceptorInterceptor } from './components/interceptors/authinterceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authinterceptorInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
