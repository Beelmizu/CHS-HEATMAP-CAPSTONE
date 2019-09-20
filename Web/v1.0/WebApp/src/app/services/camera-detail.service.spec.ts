import { TestBed, inject } from '@angular/core/testing';

import { CameraDetailService } from './camera-detail.service';

describe('CameraDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CameraDetailService]
    });
  });

  it('should be created', inject([CameraDetailService], (service: CameraDetailService) => {
    expect(service).toBeTruthy();
  }));
});
