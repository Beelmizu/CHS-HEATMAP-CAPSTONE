import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticZoneComponent } from './statistic-zone.component';

describe('StatisticZoneComponent', () => {
  let component: StatisticZoneComponent;
  let fixture: ComponentFixture<StatisticZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
