import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, tap, timeout } from 'rxjs';
import { FeatureService, FeatureStatusResponse } from '../services/Features/feature-service';
import { ToastService } from '../services/Toast/toast-service';

export interface FeatureResolveData {
  featureId: number;
  isActive: boolean;
  message?: string;
}

export const featureActiveResolver: ResolveFn<unknown> = (
  route: ActivatedRouteSnapshot
): Observable<unknown> => {
  const featureService = inject(FeatureService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const featureId = route.data['featureId'];

  if (!featureId) {
    return of({ featureId: 0, isActive: true });
  }

   return featureService.isFeatureActive(featureId).pipe(
    timeout(5000),
    
    map((response: FeatureStatusResponse) => {
      return true;
    }),
    catchError((errorResponse: any) => {
      const message = errorResponse?.error?.message 
        || errorResponse?.message 
        || 'Unable to verify feature status.';
      toastService.error(message);
      router.navigate(['/dashboard']); 
      return EMPTY;
    })
  );
};
