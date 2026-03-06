import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/Toast/toast-service';
import { TokenStorageService } from '../shared/services/TokenStorage/token-storage-service';



@Injectable()

export class authInterceptor implements HttpInterceptor {
  private tokenStorage = inject(TokenStorageService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoginRequest = request.url.includes('/auth/login');

    if (!isLoginRequest) {
      request = this.addAuthorizationHeader(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handle401Error(request);
        } else if (error.status === 403) {
          this.toastService.warning('You do not have permission to access this resource.');
        } else if (error.status === 500) {
          this.toastService.error('Internal server error. Please try again later.');
        }
        
        return throwError(() => error);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenStorage.getToken();
    
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return request;
  }

  private handle401Error(request: HttpRequest<any>): void {
    if (request.url.includes('/auth/login')) {
      return;
    }
    this.tokenStorage.clearLocalStorage();
    this.toastService.error('Your session has expired. Please login again.');
    this.router.navigate(['/login']);
  }
}
