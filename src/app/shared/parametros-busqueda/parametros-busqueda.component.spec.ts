import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ParametrosBusquedaComponent } from './parametros-busqueda.component';
import { TestingModule } from '../../testing/testing.module';

describe('ParametrosBusquedaComponent', () => {
  let component: ParametrosBusquedaComponent;
  let fixture: ComponentFixture<ParametrosBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametrosBusquedaComponent],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ParametrosBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
