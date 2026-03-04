import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[noLeadingSpace]',
  standalone: false
})
export class NoLeadingSpace {

  @Output() ngModelChange = new EventEmitter();

  constructor(private control: NgControl, private el: ElementRef) { }
  /**
   * Trim the input value on focus out of input component
   */
  @HostListener('focusout') onFocusOut() {
    (this.el.nativeElement as HTMLInputElement).value = (this.el.nativeElement as HTMLInputElement).value.trim();
    this.ngModelChange.emit(this.el.nativeElement.value)
    if (this.control && this.control.control) {
      this.control.control.setValue(this.el.nativeElement.value);
    }
  }

}
