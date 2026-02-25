import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];
  option = { 
    classname: 'bg-danger text-white p-2', 
    delay: 5000,
    icon: ''
  }

  success(textOrTpl: string | TemplateRef<any>) {
    this.option.classname = 'bg-success text-white'
    this.option.icon = 'bx bx-check'
    this.toasts = [];
    this.toasts.push({ textOrTpl, ...this.option });
  }

  info(textOrTpl: string | TemplateRef<any>) {
    this.option.classname = 'bg-info text-white'
    this.option.icon = 'bx bx-info-circle'
    this.toasts = [];
    this.toasts.push({ textOrTpl, ...this.option });
  }

  error(textOrTpl: string | TemplateRef<any>) {
    this.option.classname = 'bg-danger text-white'
    this.option.icon='bx bx-error'
    this.toasts = [];
    this.toasts.push({ textOrTpl, ...this.option });
  }

  warrning(textOrTpl: string | TemplateRef<any>){
    this.option.classname = 'bg-warning text-white'
    this.option.icon='bx bxs-alarm-exclamation'
    this.toasts = [];
    this.toasts.push({ textOrTpl, ...this.option });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
