import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FulldatepickerComponent } from './fulldatepicker.component';

describe('FulldatepickerComponent', () => {
  let component: FulldatepickerComponent;
  let fixture: ComponentFixture<FulldatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulldatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FulldatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
