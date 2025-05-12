import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimulacionComponent } from './simulacion.component';
import { TestingModule } from '../../../testing/testing.module';

describe('SimulacionComponent', () => {
  let component: SimulacionComponent;
  let fixture: ComponentFixture<SimulacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulacionComponent],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
