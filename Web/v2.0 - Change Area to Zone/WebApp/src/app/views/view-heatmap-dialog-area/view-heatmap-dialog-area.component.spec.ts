import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeatmapDialogAreaComponent } from './view-heatmap-dialog-area.component';

describe('ViewHeatmapDialogAreaComponent', () => {
  let component: ViewHeatmapDialogAreaComponent;
  let fixture: ComponentFixture<ViewHeatmapDialogAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHeatmapDialogAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHeatmapDialogAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
