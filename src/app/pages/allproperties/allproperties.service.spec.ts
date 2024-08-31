import { TestBed } from '@angular/core/testing';

import { AllpropertiesService } from './allproperties.service';

describe('AllpropertiesService', () => {
  let service: AllpropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllpropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
