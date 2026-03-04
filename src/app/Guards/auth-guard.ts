import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/services/User/user-service';



@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem('eox-app-auth-token');

    if (token) {
      return true; 
    }

    this.router.navigate(['/login']); 
    return false;
  }
}