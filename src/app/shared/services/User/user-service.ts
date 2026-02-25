import { Injectable } from '@angular/core';
import { CommonService } from '../common/common-service';
import { UserLogin } from '../../models/userLogin';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../../../global-component';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private _commonService:CommonService){

  }

  login(payload: UserLogin): Observable<any> {
    return this._commonService.post(`${GlobalComponent.loginApi}`, payload)
  }
  
}
