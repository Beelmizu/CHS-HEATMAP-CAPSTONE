import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticAgeComponent } from './statistic-age.component';

describe('StatisticAgeComponent', () => {
  let component: StatisticAgeComponent;
  let fixture: ComponentFixture<StatisticAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
