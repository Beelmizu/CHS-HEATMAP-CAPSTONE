import { TestBed, inject } from '@angular/core/testing';

import { StoreDetailService } from './store-detail.service';

describe('StoreDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreDetailService]
    });
  });

  it('should be created', inject([StoreDetailService], (service: StoreDetailService) => {
    expect(service).toBeTruthy();
  }));
});
