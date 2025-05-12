import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NuevoCicloComponent } from './nuevo-ciclo.component';
import { TestingModule } from '../../../testing/testing.module';

describe('NuevoCicloComponent', () => {
  let component: NuevoCicloComponent;
  let fixture: ComponentFixture<NuevoCicloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoCicloComponent],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(NuevoCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
