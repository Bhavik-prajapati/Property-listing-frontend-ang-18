import { TestBed } from '@angular/core/testing';

import { MypropertiesService } from './myproperties.service';

describe('MypropertiesService', () => {
  let service: MypropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MypropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
