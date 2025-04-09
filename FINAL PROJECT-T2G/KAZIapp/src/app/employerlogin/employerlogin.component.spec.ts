import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerloginComponent } from './employerlogin.component';

describe('EmployerloginComponent', () => {
  let component: EmployerloginComponent;
  let fixture: ComponentFixture<EmployerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
