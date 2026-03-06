import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../shared/models/userLogin';
import { catchError, EMPTY, finalize, map } from 'rxjs';
import { LoaderService } from '../../shared/services/Loader/loader-service';
import { UserService } from '../../shared/services/User/user-service';
import { ToastService } from '../../shared/services/Toast/toast-service';
import { TokenStorageService } from '../../shared/services/TokenStorage/token-storage-service';
import { Router } from '@angular/router';
import { RouteHistoryService } from '../../shared/services/RouteHistory/route-history-service';
import { AuthService } from '../../shared/services/Auth/auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  form: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;
  currentYear: number = new Date().getFullYear();

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private tokenStorage = inject(TokenStorageService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  private authService = inject(AuthService);


  constructor() {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/dashboard']);
    }

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      if (status) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.submitForm(this.form.getRawValue());
  }

  submitForm(formValues: any): void {
    this.loading = true;
    this.loaderService.showLoader();

    this.authService.login(formValues).pipe(
      map((response: any) => {
        if (response.success) {
          this.toastService.success(response.message || 'Login successful!');
          this.setDataAfterLogin(response);
        } else {
          this.toastService.error(response.message || 'Login failed.');
        }
      }),
      catchError((err: any) => {
        this.handleError(err);
        return EMPTY;
      }),
      finalize(() => {
        this.loading = false;
        this.loaderService.hideLoader();
      })
    ).subscribe();
  }

  private handleError(error: any): void {
    const message = error?.error?.message || error?.message || 'Login failed. Please check your credentials.';
    this.toastService.error(message);

    // this.form.reset();
  }

  private setDataAfterLogin(responseData: any): void {
    this.tokenStorage.saveUser({
      idUser: responseData.user.idUser,
      UserName: responseData.user.userName,
      Email: responseData.user.email,
      FullName: responseData.user.fullName,
      RoleId: responseData.user.roleId,
      RoleName: responseData.user.roleName,
      Permissions: responseData.user.allPermissions?.map((p: string) => p.toUpperCase()) || []
    });

    this.tokenStorage.saveToken(responseData.token);

    this.router.navigate(['/dashboard']);
  }

  togglePasswordInput(): void {
    this.showPassword = !this.showPassword;
  }
}


