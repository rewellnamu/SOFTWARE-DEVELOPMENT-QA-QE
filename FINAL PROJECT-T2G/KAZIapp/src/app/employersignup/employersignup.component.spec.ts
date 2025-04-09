import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersignupComponent } from './employersignup.component';

describe('EmployersignupComponent', () => {
  let component: EmployersignupComponent;
  let fixture: ComponentFixture<EmployersignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployersignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
