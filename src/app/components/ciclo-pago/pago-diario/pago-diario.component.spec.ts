import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDiarioComponent } from './pago-diario.component';

describe('PagoDiarioComponent', () => {
  let component: PagoDiarioComponent;
  let fixture: ComponentFixture<PagoDiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagoDiarioComponent]
    });
    fixture = TestBed.createComponent(PagoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
