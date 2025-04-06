import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerComponent } from './job-seeker.component';

describe('JobSeekerComponent', () => {
  let component: JobSeekerComponent;
  let fixture: ComponentFixture<JobSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
