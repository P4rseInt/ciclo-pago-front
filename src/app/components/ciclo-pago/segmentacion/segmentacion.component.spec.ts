import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentacionComponent } from './segmentacion.component';

describe('SegmentacionComponent', () => {
  let component: SegmentacionComponent;
  let fixture: ComponentFixture<SegmentacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentacionComponent]
    });
    fixture = TestBed.createComponent(SegmentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
