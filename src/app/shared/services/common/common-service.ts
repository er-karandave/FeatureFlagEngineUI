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
    // const isEncrypted = environment.isEncrypted;
    let postData = {
      ...data,
    }
    // if (isEncrypted) {
    //   postData = {
    //     data: encryptRequest(data),
    //   }
    // }
    return this.http.post(`${API}`, postData, this.options).pipe(
      
      // tap((response : any) => (isEncrypted) ? console.log("decryptResponse",decryptResponse(response.result)) :  ''),
      map(
        (response: any) => response.result
      ),
      catchError((err) => throwError(() => err))
    );
  }
  
}
