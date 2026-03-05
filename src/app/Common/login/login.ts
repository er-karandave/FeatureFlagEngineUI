import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../shared/models/userLogin';
import { catchError, EMPTY, finalize, map } from 'rxjs';
import { LoaderService } from '../../shared/services/Loader/loader-service';
import { UserService } from '../../shared/services/User/user-service';
import { ToastService } from '../../shared/services/Toast/toast-service';
import { TokenStorageService } from '../../shared/services/TokenStorage/token-storage-service';
import { Router } from '@angular/router';
import { RouteHistoryService } from '../../shared/services/RouteHistory/route-history-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  form: UntypedFormGroup;
  showPassword: boolean = false;
  afterLogin: string = "previousPage";
  @Output() afterLoginEmit = new EventEmitter<any>();
  constructor(private _loaderService: LoaderService,
    private _userService: UserService,
    private _toastService: ToastService,
    private _tokenStorageService: TokenStorageService,
    private _router: Router,
    private _routeHistory: RouteHistoryService
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),

    });
  }

   ngOnInit() {
    console.log(this._router.url)
    this._userService.isLoggedIn$.subscribe(status => {
        console.log(this._router.url)
        if(status){
          let prevURL = this._routeHistory.getPreviousUrl()
          if(prevURL === '/'){
            prevURL = '/dashboard';
          }
          this._router.navigate([prevURL]);
        }
      });
   }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    let formValues = this.form.getRawValue();
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return
    }
    this.submitForm(formValues)
  }

  submitForm(formValues: UserLogin) {
    this._loaderService.showLoader();
    this._userService.login(formValues).pipe(
      map((response: any) => {
        this._toastService.success(response.message);
        this.setDataAfterLogin(response);
      }),
      catchError((err: any) => {
        this.handelError(err, this.form);

        return EMPTY;
      }),
      finalize(() => {
        this._loaderService.hideLoader();
      }),
    ).subscribe();
  }


  handelError(errors: any, forms: any) {
    if (errors !== null && Object.keys(errors).length > 0) {
      for (let error in errors) {
        if (errors[error].length > 0) {
          errors[error].forEach((element: any) => {
            if (forms.controls[error]) {
              forms.controls[error].setErrors(element, { emitEvent: true })
            }
          });
        } else {
          if (forms.controls[error]) {
            forms.controls[error].setErrors(errors[error][0], { emitEvent: true })
          }
        }
      }
    }
  }

  togglePasswordInput(): any {
    this.showPassword = !this.showPassword;
  }

  setDataAfterLogin(responseData: any) {
    this._tokenStorageService.saveUser({ ...responseData.user, ip: responseData.ip });
    this._tokenStorageService.saveToken(responseData.token);
    this.afterLoginEmit.emit({ ...responseData.user, ip: responseData.ip })
    this._router.navigateByUrl('/dashboard')
  }
}


