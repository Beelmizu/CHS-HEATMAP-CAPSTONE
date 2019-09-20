import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticGenderComponent } from './statistic-gender.component';

describe('StatisticGenderComponent', () => {
  let component: StatisticGenderComponent;
  let fixture: ComponentFixture<StatisticGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
