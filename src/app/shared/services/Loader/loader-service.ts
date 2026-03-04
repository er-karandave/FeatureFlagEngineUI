import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
    public isLoading: boolean = false;
  public message: string = 'Please Wait...';

  constructor() { }

  showLoader(message: string = '') {
    this.isLoading = true
    this.message = message || 'Please Wait...'
  }

  hideLoader() {
    this.isLoading = false
    this.message = 'Please Wait...'
  }

  setLoaderMessage(message:string) {
    this.message = message || 'Please Wait...'
  }
}
