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

  // ✅ If user IS authenticated (has token)
  if (token) {
    // ✅ Block access to /login → redirect to /dashboard
    if (currentUrl.includes('/login')) {
      console.log('⛔ Already logged in, redirecting from /login to /dashboard');
      return router.createUrlTree(['/dashboard']);
    }
    
    // ✅ Allow access to protected routes
    console.log('✅ Authenticated, allowing access');
    return true;
  }

  // ✅ If user is NOT authenticated (no token)
  // ✅ Allow access to /login page
  if (currentUrl.includes('/login')) {
    console.log('✅ No token, allowing /login');
    return true;
  }

  // ✅ Block access to protected routes → redirect to /login
  console.log('⛔ No token, redirecting to /login');
  return router.createUrlTree(['/login']);
};