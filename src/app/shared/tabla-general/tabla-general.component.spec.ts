import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularTableComponent } from './modular-table.component';

describe('ModularTableComponent', () => {
  let component: ModularTableComponent;
  let fixture: ComponentFixture<ModularTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModularTableComponent]
    });
    fixture = TestBed.createComponent(ModularTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
