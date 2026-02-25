import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './Common/login/login';
import { Navbar } from './Common/navbar/navbar';
import { Footer } from './Common/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

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
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
