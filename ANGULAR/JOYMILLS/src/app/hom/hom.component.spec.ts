import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomComponent } from './hom.component';

describe('HomComponent', () => {
  let component: HomComponent;
  let fixture: ComponentFixture<HomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
