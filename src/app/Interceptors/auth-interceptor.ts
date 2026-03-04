import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoaderService } from '../shared/services/Loader/loader-service';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/Toast/toast-service';
import { TokenStorageService } from '../shared/services/TokenStorage/token-storage-service';
import { ErrorMessages } from '../shared/constants/constants';
import { GlobalComponent } from '../global-component';


@Injectable()

export class authInterceptor implements HttpInterceptor {
 
    constructor(
    private _tokenStorageService: TokenStorageService,
    private _toastService: ToastService,
    private _router: Router,
    private _location: Location,
    private _loaderServeice : LoaderService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._addAuthorizationHeader(request, next).pipe(
      catchError((error: HttpErrorResponse) => {
        this._loaderServeice.hideLoader()
        let errorData = error;
        if (error.error.result) {
          errorData = error.error.result;
        }
        // console.log("errorData",errorData);
       
         if (
          error instanceof HttpErrorResponse &&
          error.status === 401
        ) {
          this.logout();
        } else if (
          error instanceof HttpErrorResponse &&
          (request.url.includes(GlobalComponent.loginApi)) &&
          error.status === 401
        ) {
          errorData = { ...errorData, errorCode: error.status } as any
          return throwError(() => errorData);
        } else if (error.status === 404) {
          console.log("errorData",errorData);
          if (error.statusText == 'Not Found') {
            this._toastService.error(errorData.message || ErrorMessages.PageNotFound);
            errorData = { ...errorData, errorCode: error.status } as any
            this._router.navigateByUrl('**')
            return throwError(() => errorData);
            // this._toastService.error(ErrorMessages.PageNotFound);
          } else {
            this._toastService.error(errorData.message || ErrorMessages.PageNotFound);
          }
          return throwError(() => errorData);
        } else if (error.status === 405) {
          errorData = { ...errorData, errorCode: error.status } as any
          return throwError(() => errorData);
          // this._toastService.error(error.statusText);
        } else if (error.status === 400) {
          errorData = { ...errorData, errorCode: error.status } as any
          this._toastService.error(errorData.message || ErrorMessages.InternalServerError);
          return throwError(() => errorData);
          // this._toastService.error(errorData.message || ErrorMessages.InternalServerError);
        } else if (error.status === 422) {
          if (request.url.includes(GlobalComponent.loginApi)) {
            errorData = { ...errorData, errorCode: error.status } as any
          }
          return throwError(() => errorData);
        } else if (error.status === 499) {
          errorData = { ...errorData, errorCode: error.status } as any
          if (request.url.includes(GlobalComponent.loginApi)) {
            errorData = { ...errorData, errorCode: error.status } as any
          }
          return throwError(() => errorData);
        } else if (error.status === 403) {
          this._toastService.warrning(errorData.message);
          this._router.navigate(['/']);
          errorData = { ...errorData, errorCode: error.status } as any
          return throwError(() => errorData);
          // this._toastService.error(errorData.message ?? error.statusText);
        } else if (error.status === 429) {
          // this._toastService.error(errorData.message ?? error.statusText);
          errorData = { ...errorData, errorCode: error.status } as any
          return throwError(() => errorData);
        } else if (error.status === 409) {
          this._toastService.warrning(errorData.message ?? error.statusText);
          errorData = { ...errorData, errorCode: error.status } as any
          return throwError(() => errorData);
        } else if (error.status === 500) {
          this._toastService.error(ErrorMessages.InternalServerError);
        } else if (error.statusText == ErrorMessages.UnknownError) {
          this._toastService.error(ErrorMessages.InternalServerError);
        } else {
          this._toastService.error(ErrorMessages.InternalServerError);
        }
        return throwError(() => error);
      })
    )
  }

private _addAuthorizationHeader(
  request: HttpRequest<any>,
  next: HttpHandler
) {

  const token = this._tokenStorageService.getToken();

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next.handle(request);
}

  private logout() {
    this._tokenStorageService.clearLocalStorage();
    const today = new Date().valueOf();
    this._router.navigateByUrl('/login').then();
  }
};
