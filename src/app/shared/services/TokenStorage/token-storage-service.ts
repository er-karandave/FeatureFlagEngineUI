import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from '../../models/userLogin';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorage');

const TOKEN_KEY = 'app-auth-token';
const USER_KEY = 'app-user';

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

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: CurrentUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): CurrentUser | null {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as CurrentUser;
    }
    return null;
  }

  getUserPermissions(): string[] {
    const user = this.getUser();
    return user?.Permissions || [];
  }

  hasPermission(permissionCode: string): boolean {
    const permissions = this.getUserPermissions();
    return permissions.includes(permissionCode.toUpperCase());
  }

  clearLocalStorage(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUserId(): number | null {
    const user = this.getUser();
    return user?.idUser || null;
  }
  
}
