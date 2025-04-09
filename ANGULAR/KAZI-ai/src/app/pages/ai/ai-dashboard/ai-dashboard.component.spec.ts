import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiDashboardComponent } from './ai-dashboard.component';

describe('AiDashboardComponent', () => {
  let component: AiDashboardComponent;
  let fixture: ComponentFixture<AiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
