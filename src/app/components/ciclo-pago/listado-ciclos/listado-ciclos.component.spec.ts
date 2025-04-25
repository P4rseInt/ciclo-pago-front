import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCiclosComponent } from './listado-ciclos.component';

describe('ListadoCiclosComponent', () => {
  let component: ListadoCiclosComponent;
  let fixture: ComponentFixture<ListadoCiclosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoCiclosComponent]
    });
    fixture = TestBed.createComponent(ListadoCiclosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
