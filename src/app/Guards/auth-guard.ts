import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../shared/services/User/user-service';
import { TokenStorageService } from '../shared/services/TokenStorage/token-storage-service';

export const authGuard: CanActivateFn = (
  route,
  state
): boolean | UrlTree => {
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  const token = tokenStorage.getToken();
  const currentUrl = state.url;

  console.log('🔐 AuthGuard:', currentUrl, '| Token:', !!token);

  if (token) {
    if (currentUrl.includes('/login')) {
      return router.createUrlTree(['/dashboard']);
    }
    return true;
  }

  if (currentUrl.includes('/login')) {
    return true;
  }
  return router.createUrlTree(['/login']);
};