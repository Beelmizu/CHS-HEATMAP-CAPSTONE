import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticStoreComponent } from './statistic-store.component';

describe('StatisticStoreComponent', () => {
  let component: StatisticStoreComponent;
  let fixture: ComponentFixture<StatisticStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
