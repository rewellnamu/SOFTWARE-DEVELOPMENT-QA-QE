import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authpass2Component } from './authpass2.component';

describe('Authpass2Component', () => {
  let component: Authpass2Component;
  let fixture: ComponentFixture<Authpass2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authpass2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Authpass2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
