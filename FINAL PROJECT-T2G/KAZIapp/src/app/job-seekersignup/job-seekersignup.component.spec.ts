import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekersignupComponent } from './job-seekersignup.component';

describe('JobSeekersignupComponent', () => {
  let component: JobSeekersignupComponent;
  let fixture: ComponentFixture<JobSeekersignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekersignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
