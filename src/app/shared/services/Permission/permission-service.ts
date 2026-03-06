import { Injectable } from '@angular/core';
import { CurrentUser } from '../../models/userLogin';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  

  private readonly STORAGE_KEY = 'currentUser';
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  
  // ✅ Observable for components to subscribe to auth changes
  currentUser$: Observable<CurrentUser | null> = this.currentUserSubject.asObservable();

  constructor() {
    // ✅ Load user from localStorage on service init
    this.loadCurrentUser();
  }

  // ✅ Save user with permissions to localStorage
  saveCurrentUser(user: CurrentUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // ✅ Load user from localStorage
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

  // ✅ Get current user (sync)
  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.getValue();
  }

  // ✅ Check if user has specific permission code
  hasPermission(permissionCode: string): boolean {
    const user = this.getCurrentUser();
    if (!user?.Permissions) return false;
    
    // ✅ Check if permission code exists in user's permission array
    return user.Permissions.includes(permissionCode.toUpperCase());
  }

  // ✅ Check multiple permissions (ANY match)
  hasAnyPermission(permissionCodes: string[]): boolean {
    return permissionCodes.some(code => this.hasPermission(code));
  }

  // ✅ Check multiple permissions (ALL required)
  hasAllPermissions(permissionCodes: string[]): boolean {
    return permissionCodes.every(code => this.hasPermission(code));
  }

  // ✅ Get all permission codes for current user
  getUserPermissions(): string[] {
    return this.getCurrentUser()?.Permissions || [];
  }

  // ✅ Clear user (logout)
  clearCurrentUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  // ✅ Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getCurrentUser()?.token;
  }

  // ✅ Get current user ID
  getCurrentUserId(): number | null {
    return this.getCurrentUser()?.idUser || null;
  }
}
