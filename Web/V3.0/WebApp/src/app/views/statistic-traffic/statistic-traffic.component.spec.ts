import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticTrafficComponent } from './statistic-traffic.component';

describe('StatisticTrafficComponent', () => {
  let component: StatisticTrafficComponent;
  let fixture: ComponentFixture<StatisticTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
