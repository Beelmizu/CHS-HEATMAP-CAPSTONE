import { TestBed, inject } from '@angular/core/testing';

import { AccountDetailService } from './account-detail.service';

describe('AccountDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountDetailService]
    });
  });

  it('should be created', inject([AccountDetailService], (service: AccountDetailService) => {
    expect(service).toBeTruthy();
  }));
});
