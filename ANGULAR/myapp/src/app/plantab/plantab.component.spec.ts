import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantabComponent } from './plantab.component';

describe('PlantabComponent', () => {
  let component: PlantabComponent;
  let fixture: ComponentFixture<PlantabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
