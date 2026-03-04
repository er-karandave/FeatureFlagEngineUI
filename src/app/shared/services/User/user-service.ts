import { Injectable } from '@angular/core';
import { CommonService } from '../common/common-service';
import { UserLogin } from '../../models/userLogin';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalComponent } from '../../../global-component';

@Injectable({
  providedIn: 'root',
})
export class UserService {


  private loggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.loggedIn.asObservable();
  constructor(private _commonService:CommonService){
    const token = localStorage.getItem('eox-app-auth-token');
    this.loggedIn.next(!!token);
  }

  login(payload: UserLogin): Observable<any> {
    this.loggedIn.next(true);
    return this._commonService.post(`${GlobalComponent.loginApi}`, payload)
  }

  logOut(token: string){
    this.loggedIn.next(true);
    return this._commonService.post(`${GlobalComponent.loginApi}`, token)
  }
  
}
