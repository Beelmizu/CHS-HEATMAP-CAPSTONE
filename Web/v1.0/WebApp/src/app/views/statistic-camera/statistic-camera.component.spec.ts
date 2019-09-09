import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCameraComponent } from './statistic-camera.component';

describe('StatisticCameraComponent', () => {
  let component: StatisticCameraComponent;
  let fixture: ComponentFixture<StatisticCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
