import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVehicleComponent } from './post-vehicle.component';

describe('PostVehicleComponent', () => {
  let component: PostVehicleComponent;
  let fixture: ComponentFixture<PostVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostVehicleComponent]
    });
    fixture = TestBed.createComponent(PostVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
