import { TestBed, inject } from '@angular/core/testing';

import { ZoneDetailService } from './zone-detail.service';

describe('ZoneDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZoneDetailService]
    });
  });

  it('should be created', inject([ZoneDetailService], (service: ZoneDetailService) => {
    expect(service).toBeTruthy();
  }));
});
