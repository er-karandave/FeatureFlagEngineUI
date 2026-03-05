import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  options = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
  } as any;

  maxRetries: number = 2;

  constructor(private http:HttpClient){

  }

  post(API: string, data?: any): Observable<any> {
    let postData = {
      ...data,
    }
    return this.http.post(`${API}`, postData, this.options).pipe(
      map(
        (response: any) => response
      ),
      catchError((err) => throwError(() => err))
    );
  }
  
}
