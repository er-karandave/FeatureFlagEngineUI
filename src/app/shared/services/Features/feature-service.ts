import { Injectable } from '@angular/core';
import { CommonService } from '../common/common-service';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../../../global-component';
import { Feature } from '../../../main/dashboard/dashboard';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {


  constructor(private _commonService: CommonService) {

  }

  getFeaturesByFeatureMasterId(featureMasterId: number): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getFeatureByFeatureMasterId}?idfeatureMasterId=${featureMasterId}`)
  }

  getFeaturesByFeatureId(id: number): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getFeatureByFeatureId}?IdFeature=${id}`)
  }

  getAllActiveFeatures(): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getAllActiveFeatures}`)
  }

  getAllInActiveFeatures(): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getAllInActiveFeatures}`)
  }

  getAllFeatures(): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getAllFeatures}`)
  }

  updateFeature(updatedFeature:Feature): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getAllFeatures}`)
  }

  deleteFeature(featureMasterId: number): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getAllFeatures}`)
  }
}
