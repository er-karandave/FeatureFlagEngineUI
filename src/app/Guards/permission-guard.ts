import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { PermissionService } from '../shared/services/Permission/permission-service';
import { inject } from '@angular/core';

export const permissionGuard: CanActivateFn = (
  route,
  state
): boolean | UrlTree => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const requiredPermission = route.data['permission'] as string;
  if (!requiredPermission) {
    return true;
  }
  if (permissionService.hasPermission(requiredPermission)) {
    return true;
  }
  console.warn(`Access denied: User lacks permission '${requiredPermission}'`);
  return router.createUrlTree(['/dashboard']);

  // return false;
};