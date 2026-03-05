import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureState {

  private featureRefreshSource = new BehaviorSubject<boolean>(false);
  featureRefresh$: Observable<boolean> = this.featureRefreshSource.asObservable();

  triggerFeatureRefresh(): void {
    this.featureRefreshSource.next(true);
    setTimeout(() => this.featureRefreshSource.next(false), 100);
  }
  
}
