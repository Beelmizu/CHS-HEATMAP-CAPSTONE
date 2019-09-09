import { TestBed } from '@angular/core/testing';

import { AccountDetailService } from './account-detail.service';

describe('AccountDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountDetailService = TestBed.get(AccountDetailService);
    expect(service).toBeTruthy();
  });
});
