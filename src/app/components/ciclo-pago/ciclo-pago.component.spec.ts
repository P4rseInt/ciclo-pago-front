import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloPagoComponent } from './ciclo-pago.component';

describe('CicloPagoComponent', () => {
  let component: CicloPagoComponent;
  let fixture: ComponentFixture<CicloPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CicloPagoComponent]
    });
    fixture = TestBed.createComponent(CicloPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
