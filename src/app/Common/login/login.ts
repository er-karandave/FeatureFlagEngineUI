import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../shared/models/userLogin';
import { catchError, EMPTY, finalize, map } from 'rxjs';
import { LoaderService } from '../../shared/services/Loader/loader-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  form: UntypedFormGroup;
  showPassword: boolean = false;
  constructor(private _loaderService: LoaderService){
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      
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
    this.subscriptionRefs = this._authenticationService.login(formValues).pipe(
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

  
  handelError(errors:any, forms:any) {
    if (errors !== null && Object.keys(errors).length > 0) {
      for (let error in errors) {
        if (errors[error].length > 0) {
          errors[error].forEach((element : any) => {
            if(forms.controls[error]){
              forms.controls[error].setErrors(element, { emitEvent: true })
            }            
          });
        } else {
          if(forms.controls[error]){ 
            forms.controls[error].setErrors(errors[error][0], { emitEvent: true })
          }          
        }
      }
    }
  }

   togglePasswordInput(): any {
    this.showPassword = !this.showPassword;
  }

    setDataAfterLogin(responseData) {
    this._tokenStorageService.saveUser({ ...responseData.user, ip: responseData.ip });
    this._tokenStorageService.saveToken(responseData.access_token);
    this._tokenStorageService.saveRefereshtoken(responseData.refresh_token);
    if (this.openFrom !== 'default') {
      this._eventService.broadcast(BroadcastEvents.showGrecaptcha, { action: false })
      this._eventService.broadcast(BroadcastEvents.isUserLogin, true)
      this.afterLoginEmit.emit({ ...responseData.user, ip: responseData.ip })
    } else {
      let returnUrl = this.afterLogin
      if (this.afterLogin === 'previousPage') {
        returnUrl = this._tokenStorageService.getReturnURL()
      }
      let isProtectedRoute = fullPageBannerPrefixes.some(prefix => returnUrl.startsWith(prefix));
      returnUrl = isProtectedRoute ? "/" : returnUrl;
      this._router.navigateByUrl(returnUrl || '/')
    }
  }

}
