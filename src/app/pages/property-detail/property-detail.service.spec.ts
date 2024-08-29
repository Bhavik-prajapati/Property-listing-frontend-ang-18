import { TestBed } from '@angular/core/testing';

import { PropertyDetailService } from './property-detail.service';

describe('PropertyDetailService', () => {
  let service: PropertyDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
