import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './Common/login/login';
import { Navbar } from './Common/navbar/navbar';
import { Footer } from './Common/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE } from './shared/services/TokenStorage/token-storage-service';
import { SharedModule } from './shared/shared-module';
import { authInterceptor } from './Interceptors/auth-interceptor';

@NgModule({
  declarations: [
    App,
    Login,
    Navbar,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,SharedModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
     {
      provide: LOCAL_STORAGE,
      useValue: window.localStorage
    },
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
  ],
  bootstrap: [App]
})
export class AppModule { }
