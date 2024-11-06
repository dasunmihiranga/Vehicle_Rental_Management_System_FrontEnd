import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVehicleComponent } from './update-vehicle.component';

describe('UpdateVehicleComponent', () => {
  let component: UpdateVehicleComponent;
  let fixture: ComponentFixture<UpdateVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVehicleComponent]
    });
    fixture = TestBed.createComponent(UpdateVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
