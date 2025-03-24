import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillsComponent } from './mills.component';

describe('MillsComponent', () => {
  let component: MillsComponent;
  let fixture: ComponentFixture<MillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
