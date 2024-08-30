import { TestBed } from '@angular/core/testing';

import { PostpropertyService } from './postproperty.service';

describe('PostpropertyService', () => {
  let service: PostpropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostpropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
