import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversoPagoComponent } from './universo-pago.component';
import { TestingModule } from '../../../testing/testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UniversoPagoComponent', () => {
  let component: UniversoPagoComponent;
  let fixture: ComponentFixture<UniversoPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversoPagoComponent],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(UniversoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
