import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AIboardComponent } from './aiboard.component';

describe('AIboardComponent', () => {
  let component: AIboardComponent;
  let fixture: ComponentFixture<AIboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AIboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AIboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
