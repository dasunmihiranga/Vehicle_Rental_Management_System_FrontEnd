import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginheaderComponent } from './loginheader.component';

describe('LoginheaderComponent', () => {
  let component: LoginheaderComponent;
  let fixture: ComponentFixture<LoginheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginheaderComponent]
    });
    fixture = TestBed.createComponent(LoginheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
