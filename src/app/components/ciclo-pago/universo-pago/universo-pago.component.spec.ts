import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversoPagoComponent } from './universo-pago.component';

describe('UniversoPagoComponent', () => {
  let component: UniversoPagoComponent;
  let fixture: ComponentFixture<UniversoPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversoPagoComponent]
    });
    fixture = TestBed.createComponent(UniversoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
