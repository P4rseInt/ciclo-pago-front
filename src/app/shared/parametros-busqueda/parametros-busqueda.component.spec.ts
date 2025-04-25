import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosBusquedaComponent } from './parametros-busqueda.component';

describe('ParametrosBusquedaComponent', () => {
  let component: ParametrosBusquedaComponent;
  let fixture: ComponentFixture<ParametrosBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametrosBusquedaComponent]
    });
    fixture = TestBed.createComponent(ParametrosBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
