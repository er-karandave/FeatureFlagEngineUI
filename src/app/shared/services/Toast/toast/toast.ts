import { Component, inject, TemplateRef } from '@angular/core';
import { ToastInterface, ToastService } from '../toast-service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  host: { 'class': 'toast-container position-fixed top-5 end-0 p-3', 'style': 'z-index: 1200' }
})
export class Toast {

  toastService = inject(ToastService);
  constructor(
  ) { }


  isTemplateRef(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }

}
