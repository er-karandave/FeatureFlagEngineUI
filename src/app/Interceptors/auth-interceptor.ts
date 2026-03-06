import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoaderService } from '../shared/services/Loader/loader-service';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/Toast/toast-service';
import { TokenStorageService } from '../shared/services/TokenStorage/token-storage-service';
import { ErrorMessages } from '../shared/constants/constants';
import { GlobalComponent } from '../global-component';
import { AuthService } from '../shared/services/Auth/auth-service';


@Injectable()

export class authInterceptor implements HttpInterceptor {
  private tokenStorage = inject(TokenStorageService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private authService = inject(AuthService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ✅ Skip auth header for login endpoint
    const isLoginRequest = request.url.includes('/auth/login');

    if (!isLoginRequest) {
      request = this.addAuthorizationHeader(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // ✅ Token expired or invalid
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
    // ✅ Don't logout on login request (let login component handle it)
    if (request.url.includes('/auth/login')) {
      return;
    }

    // ✅ Clear token and redirect to login
    this.tokenStorage.clearLocalStorage();
    this.toastService.error('Your session has expired. Please login again.');
    this.router.navigate(['/login']);
  }
}
