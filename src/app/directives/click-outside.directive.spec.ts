import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div
      class="modal"
      appClickOutside
      (appClickOutside)="onClickOutside()"
    ></div>
    <div class="other-element"></div>
  `
})
class TestComponent {
  public clickedOutside = false;

  public onClickOutside() {
    this.clickedOutside = true;
  }
}

describe('ClickOutsideDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(
      By.directive(ClickOutsideDirective)
    ); // Usar By.directive para asegurar que se obtiene el elemento correcto
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(directiveElement);
    expect(directive).toBeTruthy();
  });

  it('should emit appClickOutside when clicking outside of the element', () => {
    const otherElement =
      fixture.debugElement.nativeElement.querySelector('.other-element');
    otherElement.click();
    expect(component.clickedOutside).toBe(true);
  });

  it('should not emit appClickOutside when clicking inside of the element', () => {
    const modalElement =
      fixture.debugElement.nativeElement.querySelector('.modal');
    modalElement.click();
    expect(component.clickedOutside).toBe(false);
  });

  it('debería ignorar las clases especificadas al hacer clic fuera del elemento', () => {
    const ignoredElements = [
      document.createElement('div'),
      document.createElement('span'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ];

    ignoredElements[0].classList.add('mat-mdc-button-touch-target');
    ignoredElements[1].classList.add('mat-calendar-body-cell-content');
    ignoredElements[2].classList.add('mat-calendar-table');
    ignoredElements[3].classList.add('mat-datepicker-content');
    ignoredElements[4].classList.add('mat-calendar');
    ignoredElements[5].classList.add('mat-calendar-arrow');
    ignoredElements[6].classList.add('mat-calendar-body');
    ignoredElements[7].classList.add('mat-calendar-body-cell');
    ignoredElements[8].classList.add('mat-calendar-next-button');
    ignoredElements[9].classList.add('mat-calendar-previous-button');
    ignoredElements[10].classList.add('mat-calendar-period-button');
    ignoredElements[11].classList.add('mat-mdc-button-persistent-ripple');
    ignoredElements[12].classList.add('mat-mdc-focus-indicator');
    ignoredElements[13].classList.add('mdc-button');
    ignoredElements[14].classList.add('mat-mdc-button');
    ignoredElements[15].classList.add('mat-unthemed');
    ignoredElements[16].classList.add('mat-mdc-button-base');
    ignoredElements[17].classList.add('mat-calendar-toggle');
    ignoredElements[18].classList.add('mat-mdc-button');
    ignoredElements[19].classList.add('mdc-button__label');
    ignoredElements[19].appendChild(document.createElement('span'));

    if (directiveElement && directiveElement.nativeElement) {
      ignoredElements.forEach((element) => {
        directiveElement.nativeElement.appendChild(element);
        element.click();
        expect(component.clickedOutside).toBe(false);
      });
    } else {
      fail(
        'El elemento directiveElement o directiveElement.nativeElement es undefined'
      );
    }
  });
});
