import { TestBed, inject } from '@angular/core/testing';

import { AreaDetailService } from './area-detail.service';

describe('AreaDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaDetailService]
    });
  });

  it('should be created', inject([AreaDetailService], (service: AreaDetailService) => {
    expect(service).toBeTruthy();
  }));
});
