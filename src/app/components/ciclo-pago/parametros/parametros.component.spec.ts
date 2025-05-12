import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ParametrosComponent } from './parametros.component';
import { TestingModule } from '../../../testing/testing.module';

describe('ParametrosComponent', () => {
  let component: ParametrosComponent;
  let fixture: ComponentFixture<ParametrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametrosComponent],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
