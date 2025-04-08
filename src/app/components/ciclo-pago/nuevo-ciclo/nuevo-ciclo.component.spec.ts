import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCicloComponent } from './nuevo-ciclo.component';

describe('NuevoCicloComponent', () => {
  let component: NuevoCicloComponent;
  let fixture: ComponentFixture<NuevoCicloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoCicloComponent]
    });
    fixture = TestBed.createComponent(NuevoCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
