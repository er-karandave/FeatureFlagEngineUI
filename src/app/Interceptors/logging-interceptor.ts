import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class loggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const start = Date.now();
    
    return next.handle(req).pipe(
      tap(event => {
        if (req.url.includes('/navigation/menu')) {
          console.log(`🌐 API Call: ${req.url}`);
          console.log(`⏱️  Response time: ${Date.now() - start}ms`);
        }
      })
    );
  }
}
