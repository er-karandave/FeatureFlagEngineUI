import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PermissionService } from '../Permission/permission-service';
import { CurrentUser } from '../../models/userLogin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GlobalComponent } from '../../../global-component';
import { TokenStorageService } from '../TokenStorage/token-storage-service';
import { Router } from '@angular/router';


export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    idUser: number;
    userName: string;
    email: string;
    fullName?: string;
    roleId?: number;
    roleName?: string;
    directPermissions: { idPermission: number; permissionName: string; permissionCode: string }[];
    rolePermissions: { idPermission: number; permissionName: string; permissionCode: string }[];
    allPermissions: string[];
  };
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
   private tokenStorage = inject(TokenStorageService);
  
    private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.tokenStorage.isAuthenticated()
  );
  constructor(
    private http: HttpClient,
    private permissionService: PermissionService,
  ) { }
  

  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(GlobalComponent.loginApi, credentials).pipe(
      tap((response) => {
        if (response.success && response.token) {
          // ✅ Save token
          this.tokenStorage.saveToken(response.token);
          this.isLoggedInSubject.next(true)
          // ✅ Save user with permissions
          this.tokenStorage.saveUser({
            idUser: response.user.idUser,
            UserName: response.user.userName,
            Email: response.user.email,
            FullName: response.user.fullName,
            RoleId: response.user.roleId,
            RoleName: response.user.roleName,
            Permissions: response.user.allPermissions.map(p => p.toUpperCase())
          });
          // this.permissionService.saveCurrentUser(currentUser);
        }
      })
    );
  }

  logout(): Observable<any> {
    //LogOut
    return this.http.post(GlobalComponent.loginApi, {}).pipe(
      tap(() => {
        // ✅ Clear local storage regardless of server response
        this.tokenStorage.clearLocalStorage();
        this.isLoggedInSubject.next(false)
        this.router.navigate(['/login']);
      })
    );
  }

  forceLogout(): void {
    this.tokenStorage.clearLocalStorage();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenStorage.isAuthenticated();
  }

  getCurrentUser() {
    return this.tokenStorage.getUser();
  }

}
