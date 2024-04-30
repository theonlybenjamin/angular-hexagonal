import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { accessTokenInterceptor } from './infraestructure/interceptors/access-token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthPort } from './domain/ports/auth/auth.port';
import { ApiAuthAdapter } from './infraestructure/http/auth.adapter';
import { OrderAdapter } from './infraestructure/http/order.adater';
import { DocumentTypesPort } from './domain/ports/types-document/document-types.port';
import { DocumentTypesAdapter } from './infraestructure/http/document-types.adapter';
import { ProductPort } from './domain/ports/products/product.port';
import { ProductAdapter } from './infraestructure/http/product.adapter';
//Al utilizar InjectionToken, puedes asociar cualquier tipo, incluidas interfaces, con un token específico.
// Esto permite que Angular resuelva correctamente la dependencia cuando se inyecta en un componente, servicio, etc.
export const AUTH_PORT_TOKEN = new InjectionToken<AuthPort>('AuthPort');
export const ORDER_PORT_TOKEN = new InjectionToken<AuthPort>('OrderPort');
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([accessTokenInterceptor]),
    withFetch()),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    {
      provide: AUTH_PORT_TOKEN,
      useClass: ApiAuthAdapter
    },
    {
      provide: ORDER_PORT_TOKEN,
      useClass: OrderAdapter
    },
    {
      provide: DocumentTypesPort,
      useClass: DocumentTypesAdapter
    }, 
    {
      provide: ProductPort,
      useClass: ProductAdapter
    },
    provideAnimationsAsync(),
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'}
  ]
};