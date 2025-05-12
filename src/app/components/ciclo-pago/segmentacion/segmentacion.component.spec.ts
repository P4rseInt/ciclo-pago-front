import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SegmentacionComponent } from './segmentacion.component';
import { TestingModule } from '../../../testing/testing.module';

describe('SegmentacionComponent', () => {
  let component: SegmentacionComponent;
  let fixture: ComponentFixture<SegmentacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentacionComponent],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SegmentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
