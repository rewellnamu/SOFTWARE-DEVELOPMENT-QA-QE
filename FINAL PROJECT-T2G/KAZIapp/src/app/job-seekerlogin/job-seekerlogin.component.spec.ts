import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerloginComponent } from './job-seekerlogin.component';

describe('JobSeekerloginComponent', () => {
  let component: JobSeekerloginComponent;
  let fixture: ComponentFixture<JobSeekerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
