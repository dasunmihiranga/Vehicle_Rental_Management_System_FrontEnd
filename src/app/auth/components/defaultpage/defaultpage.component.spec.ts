import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultpageComponent } from './defaultpage.component';

describe('DefaultpageComponent', () => {
  let component: DefaultpageComponent;
  let fixture: ComponentFixture<DefaultpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultpageComponent]
    });
    fixture = TestBed.createComponent(DefaultpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
