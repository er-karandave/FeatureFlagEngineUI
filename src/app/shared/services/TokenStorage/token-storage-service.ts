import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CurrentUser } from '../../models/userLogin';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorage');

const TOKEN_KEY = 'eox-app-auth-token';
const USER_KEY = 'eox-app-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {

  isRefreshing$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
  ) { }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  // ✅ Get token
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // ✅ Save user with permissions
  saveUser(user: CurrentUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // ✅ Get user
  getUser(): CurrentUser | null {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as CurrentUser;
    }
    return null;
  }

  // ✅ Get user permissions
  getUserPermissions(): string[] {
    const user = this.getUser();
    return user?.Permissions || [];
  }

  // ✅ Check if user has permission
  hasPermission(permissionCode: string): boolean {
    const permissions = this.getUserPermissions();
    return permissions.includes(permissionCode.toUpperCase());
  }

  // ✅ Clear all (logout)
  clearLocalStorage(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  // ✅ Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ✅ Get current user ID
  getCurrentUserId(): number | null {
    const user = this.getUser();
    return user?.idUser || null;
  }
  
}
