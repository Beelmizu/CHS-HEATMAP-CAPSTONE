import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeatmapDialogComponent } from './view-heatmap-dialog.component';

describe('ViewHeatmapDialogComponent', () => {
  let component: ViewHeatmapDialogComponent;
  let fixture: ComponentFixture<ViewHeatmapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHeatmapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHeatmapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
