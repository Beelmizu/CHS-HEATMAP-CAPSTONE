import { TestBed, inject } from '@angular/core/testing';

import { CameraLiveService } from './camera-live.service';

describe('CameraLiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CameraLiveService]
    });
  });

  it('should be created', inject([CameraLiveService], (service: CameraLiveService) => {
    expect(service).toBeTruthy();
  }));
});
