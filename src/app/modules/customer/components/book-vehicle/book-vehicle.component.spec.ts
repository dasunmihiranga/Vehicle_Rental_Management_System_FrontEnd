import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVehicleComponent } from './book-vehicle.component';

describe('BookVehicleComponent', () => {
  let component: BookVehicleComponent;
  let fixture: ComponentFixture<BookVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookVehicleComponent]
    });
    fixture = TestBed.createComponent(BookVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
