import { TestBed, inject } from '@angular/core/testing';

import { SocketConnectService } from './socket-connect.service';

describe('SocketConnectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketConnectService]
    });
  });

  it('should be created', inject([SocketConnectService], (service: SocketConnectService) => {
    expect(service).toBeTruthy();
  }));
});
