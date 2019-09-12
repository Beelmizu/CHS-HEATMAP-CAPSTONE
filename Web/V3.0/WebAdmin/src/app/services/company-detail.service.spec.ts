import { TestBed, inject } from '@angular/core/testing';

import { CompanyDetailService } from './company-detail.service';

describe('CompanyDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyDetailService]
    });
  });

  it('should be created', inject([CompanyDetailService], (service: CompanyDetailService) => {
    expect(service).toBeTruthy();
  }));
});
