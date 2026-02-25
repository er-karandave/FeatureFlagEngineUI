import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../toast-service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  host: { 'class': 'toast-container position-fixed top-5 end-0 p-3', 'style': 'z-index: 1200' }
})
export class Toast {

  constructor(public toastService: ToastService) { }

  isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }

}
