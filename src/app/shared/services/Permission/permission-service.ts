import { Injectable } from '@angular/core';
import { CurrentUser } from '../../models/userLogin';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  

  private readonly STORAGE_KEY = 'currentUser';
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  
  currentUser$: Observable<CurrentUser | null> = this.currentUserSubject.asObservable();

  constructor() {
    this.loadCurrentUser();
  }

  saveCurrentUser(user: CurrentUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  loadCurrentUser(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored) as CurrentUser;
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Failed to parse stored user', e);
        this.clearCurrentUser();
      }
    }
  }

  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.getValue();
  }

  hasPermission(permissionCode: string): boolean {
    const user = this.getCurrentUser();
    if (!user?.Permissions) return false;
    
    return user.Permissions.includes(permissionCode.toUpperCase());
  }

  hasAnyPermission(permissionCodes: string[]): boolean {
    return permissionCodes.some(code => this.hasPermission(code));
  }

  hasAllPermissions(permissionCodes: string[]): boolean {
    return permissionCodes.every(code => this.hasPermission(code));
  }

  getUserPermissions(): string[] {
    return this.getCurrentUser()?.Permissions || [];
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser()?.token;
  }

  getCurrentUserId(): number | null {
    return this.getCurrentUser()?.idUser || null;
  }
}
