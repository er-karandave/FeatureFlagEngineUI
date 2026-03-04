import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorage');

const prefix = 'eox-app-'

const TOKEN_KEY = `${prefix}auth-token`;
const USER_KEY = `${prefix}currentUser`;

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {

  isRefreshing$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
  ) { }

  public saveToken(token: string): void {
    this.localStorage.removeItem(TOKEN_KEY);
    this.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | undefined | null {
    const token = this.localStorage.getItem(TOKEN_KEY);
    if (token) {
      return token
    }
    return null;
  }

  public saveUser(user: any): void {
    this.localStorage.removeItem(USER_KEY);
    this.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = this.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }


  // public setReturnUrl(url: string): void {
  //   url = this.window.location.href.replace(environment.apiURL, '');
  //   let isProtectedRoute = fullPageBannerPrefixes.some(prefix => url.startsWith(prefix));
  //   if (!isProtectedRoute) {
  //     this._cookieService.delete(RETURNURL);
  //     this._cookieService.set(RETURNURL, encryptLocalStorageData(url),this.cookieConfig);
  //   }
  // }

  // public setCurrentUrl(url: string): void {
  //   this._cookieService.delete(CURRENTURL);
  //   this._cookieService.set(CURRENTURL, encryptLocalStorageData(url),this.cookieConfig);
  // }

  // public getCurrentUrl(): string {
  //   const url = this._cookieService.get(CURRENTURL);
  //   if (url) {
  //     return url
  //   }
  //   return "/";
  // }

  public setLocalStorage(key: string, value: string): void {
    this.localStorage.removeItem(key);
    this.localStorage.setItem(key, value);
  }

  public getLocalStorage(key: string): string | null {
    const keyValue = this.localStorage.getItem(key);
    if (keyValue) {
      return decodeURIComponent(keyValue)
    }
    return null
  }

  clearLocalStorage() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
  
}
