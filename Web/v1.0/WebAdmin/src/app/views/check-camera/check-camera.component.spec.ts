import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCameraComponent } from './check-camera.component';

describe('CheckCameraComponent', () => {
  let component: CheckCameraComponent;
  let fixture: ComponentFixture<CheckCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
