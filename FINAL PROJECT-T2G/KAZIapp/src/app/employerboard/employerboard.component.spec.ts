import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerboardComponent } from './employerboard.component';

describe('EmployerboardComponent', () => {
  let component: EmployerboardComponent;
  let fixture: ComponentFixture<EmployerboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
