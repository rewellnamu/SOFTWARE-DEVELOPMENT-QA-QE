import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthpassComponent } from './authpass.component';

describe('AuthpassComponent', () => {
  let component: AuthpassComponent;
  let fixture: ComponentFixture<AuthpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthpassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
