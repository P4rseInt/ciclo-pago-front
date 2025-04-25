import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGeneralComponent } from './tabla-general.component';

describe('ModularTableComponent', () => {
  let component: TablaGeneralComponent;
  let fixture: ComponentFixture<TablaGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaGeneralComponent]
    });
    fixture = TestBed.createComponent(TablaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
