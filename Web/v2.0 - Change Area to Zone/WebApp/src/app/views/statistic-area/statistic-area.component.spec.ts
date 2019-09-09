import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticAreaComponent } from './statistic-area.component';

describe('StatisticAreaComponent', () => {
  let component: StatisticAreaComponent;
  let fixture: ComponentFixture<StatisticAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
