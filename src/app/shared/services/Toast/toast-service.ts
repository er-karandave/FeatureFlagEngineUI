import { Injectable, signal, TemplateRef } from '@angular/core';


export interface ToastInterface {
  id: string;
  textOrTpl: string | TemplateRef<any>;
  classname: string;
  delay: number;
  icon: string;
  autoHide?: boolean;
  timeoutId?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSignal = signal<ToastInterface[]>([]);

  readonly toasts = this.toastsSignal.asReadonly();

  private toastCounter = 0;

  private generateId(): string {
    return `toast-${++this.toastCounter}-${Date.now()}`;
  }

  private createToast(
    textOrTpl: string | TemplateRef<any>,
    classname: string,
    icon: string,
    delay: number = 3000
  ): ToastInterface {
    return {
      id: this.generateId(),
      textOrTpl,
      classname,
      icon,
      delay
    };
  }

  private addToastWithAutoDismiss(toast: ToastInterface) {
    this.toastsSignal.update(toasts => [...toasts, toast]);

    const timeoutId = setTimeout(() => {
      this.remove(toast.id);
    }, toast.delay);
    toast.timeoutId = timeoutId;
  }

  success(message: string | TemplateRef<any>, delay: number = 3000) {
    this.addToastWithAutoDismiss(
      this.createToast(message, 'bg-success text-white', 'bx bx-check', delay)
    );
  }

  error(message: string | TemplateRef<any>, delay: number = 3000) {
    this.addToastWithAutoDismiss(
      this.createToast(message, 'bg-danger text-white', 'bx bx-error', delay)
    );
  }

  info(message: string | TemplateRef<any>, delay: number = 3000) {
    this.addToastWithAutoDismiss(
      this.createToast(message, 'bg-info text-white', 'bx bx-info-circle', delay)
    );
  }

  warning(message: string | TemplateRef<any>, delay: number = 3000) {
    this.addToastWithAutoDismiss(
      this.createToast(message, 'bg-warning text-dark', 'bx bxs-alarm-exclamation', delay)
    );
  }

  remove(toastId: string) {
    const toasts = this.toastsSignal();
    const toast = toasts.find(t => t.id === toastId);

    if (toast?.timeoutId) {
      clearTimeout(toast.timeoutId); 
    }

    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== toastId));
  }

  clear() {
    this.toastsSignal().forEach(toast => {
      if (toast.timeoutId) clearTimeout(toast.timeoutId);
    });
    this.toastsSignal.set([]);
  }

  ngOnDestroy() {
    this.clear();
  }
}
