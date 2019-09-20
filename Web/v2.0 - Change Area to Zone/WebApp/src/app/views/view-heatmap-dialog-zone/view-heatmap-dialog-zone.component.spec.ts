import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeatmapDialogZoneComponent } from './view-heatmap-dialog-zone.component';

describe('ViewHeatmapDialogZoneComponent', () => {
  let component: ViewHeatmapDialogZoneComponent;
  let fixture: ComponentFixture<ViewHeatmapDialogZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHeatmapDialogZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHeatmapDialogZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
