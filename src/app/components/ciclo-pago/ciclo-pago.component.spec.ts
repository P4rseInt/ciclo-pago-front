import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CicloPagoComponent } from './ciclo-pago.component';
import { TestingModule } from '../../testing/testing.module';
import { ListadoCiclosModule } from '@components/ciclo-pago/listado-ciclos/listado-ciclos.module';

describe('CicloPagoComponent', () => {
  let component: CicloPagoComponent;
  let fixture: ComponentFixture<CicloPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CicloPagoComponent],
      imports: [TestingModule, ListadoCiclosModule]
    });
    fixture = TestBed.createComponent(CicloPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
