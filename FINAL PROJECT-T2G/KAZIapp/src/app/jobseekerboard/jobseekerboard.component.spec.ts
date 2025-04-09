import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerboardComponent } from './jobseekerboard.component';

describe('JobseekerboardComponent', () => {
  let component: JobseekerboardComponent;
  let fixture: ComponentFixture<JobseekerboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
