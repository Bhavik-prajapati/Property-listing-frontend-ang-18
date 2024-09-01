import { TestBed } from '@angular/core/testing';

import { GlobalauthService } from './globalauth.service';

describe('GlobalauthService', () => {
  let service: GlobalauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
