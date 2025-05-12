import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCiclosComponent } from './listado-ciclos.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { of } from 'rxjs';

// Crear un componente mock para p-divider
@Component({
  selector: 'p-divider',
  template: '<div></div>'
})
class MockDividerComponent {}

// Crear un componente mock para p-dialog si es necesario
@Component({
  selector: 'p-dialog',
  template: '<div><ng-content></ng-content></div>'
})
class MockDialogComponent {
  visible: boolean = false;
}

describe('ListadoCiclosComponent', () => {
  let component: ListadoCiclosComponent;
  let fixture: ComponentFixture<ListadoCiclosComponent>;
  let routerMock: Partial<Router>;
  let dataServiceMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn().mockReturnValue(Promise.resolve(true))
    } as unknown as jest.Mocked<Router>;

    dataServiceMock = {
      getData: jest.fn().mockReturnValue(of({ name: 'test' })),
      setDatosSimulacion: jest.fn(),
      getDatosSimulacion: jest.fn()
    } as unknown as jest.Mocked<DataService>;

    TestBed.configureTestingModule({
      declarations: [
        ListadoCiclosComponent,
        MockDividerComponent,
        MockDialogComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: DataService, useValue: dataServiceMock }
      ]
    });

    fixture = TestBed.createComponent(ListadoCiclosComponent);
    component = fixture.componentInstance;

    // Espiar métodos privados
    jest.spyOn(component as any, 'verCiclo');
    jest.spyOn(component as any, 'eliminar');
    jest.spyOn(component as any, 'navegarAParametros');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
