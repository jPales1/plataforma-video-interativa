import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-pilytijhc2tbche2.us.auth0.com',
      clientId: 'I2r224pUQuf5dpxM8rpn4rV8N3HJGFOz',
      authorizationParams: { redirect_uri: window.location.origin, }
    }),
  ]
};
