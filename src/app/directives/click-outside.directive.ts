import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {

  @Output() appClickOutside = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])

  public onClick(targetElement: any) {
    const isButtonToOpenModal = targetElement.classList.contains('mat-mdc-button-touch-target');
    const isIgnoredClass = this.checkIfIgnoredClass(targetElement);

    if (!isButtonToOpenModal && !isIgnoredClass && !this.elementRef.nativeElement.contains(targetElement)) {
      this.appClickOutside.emit();
    }
  }

  private checkIfIgnoredClass(element: any): boolean {
    if (!element) {
      return false;
    }

    const ignoredClasses = [
      'mat-mdc-button-touch-target',
      'mat-calendar-body-cell-content',
      'mat-calendar-table',
      'mat-datepicker-content',
      'mat-calendar',
      'mat-calendar-arrow',
      'mat-calendar-body',
      'mat-calendar-body-cell',
      'mat-calendar-next-button',
      'mat-calendar-previous-button',
      'mat-calendar-period-button',
      'mat-calendar-period-button',
      'mat-mdc-button-persistent-ripple',
      'mat-mdc-focus-indicator',
      'mdc-button',
      'mat-mdc-button',
      'mat-unthemed',
      'mat-mdc-button-base',
      'mat-calendar-toggle',
    ];

    for (const className of ignoredClasses) {
      if (element.classList.contains(className)) {
        return true;
      }
    }

    // Verificar si el elemento es un <span> y si su padre tiene la clase 'mdc-button__label'
    if (element.tagName === 'SPAN' && element.parentElement.classList.contains('mdc-button__label')) {
      return true;
    }

    return false;
  }
}
