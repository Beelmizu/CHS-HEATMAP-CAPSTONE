import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthyearpickerComponent } from './monthyearpicker.component';

describe('MonthyearpickerComponent', () => {
  let component: MonthyearpickerComponent;
  let fixture: ComponentFixture<MonthyearpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthyearpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthyearpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
