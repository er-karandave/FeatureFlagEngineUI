import { Injectable } from '@angular/core';
import { CommonService } from '../common/common-service';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../../../global-component';
import { Feature } from '../../../main/dashboard/dashboard';

export interface FeatureStatusResponse {
  isActive: boolean;
  message?: string;
}

export interface FeatureResponse {
  success: boolean;
  message: string;
  data: Feature[];
}

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

  getAllFeatures(includeInactive: boolean = false): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getAllFeatures}?includeInactive=${includeInactive}`)
  }

  updateFeature(updatedFeature: Feature): Observable<any> {
    return this._commonService.post(`${GlobalComponent.getAllFeatures}`)
  }

  deleteFeatureById(featureId: number): Observable<any> {
    return this._commonService.post(`${GlobalComponent.deleteFeatureById}?FeatureId=${featureId}`)
  }

  updateFeatureStatus(
    featureId: number | undefined,
    isActive: boolean
  ): Observable<{ success: boolean; message: string }> {
    return this._commonService.post(
      `${GlobalComponent.updateFeatureStatus}?FeatureId=${featureId}&IsActive=${isActive}`
    );
  }

  isFeatureActive(featureId: number): Observable<FeatureStatusResponse> {
    return this._commonService.post(`${GlobalComponent.isFeatureActive}${featureId}/status`)
  }
}
