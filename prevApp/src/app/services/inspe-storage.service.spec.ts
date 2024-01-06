import { TestBed } from '@angular/core/testing';

import { InspeStorageService } from './inspe-storage.service';

describe('InspeStorageService', () => {
  let service: InspeStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspeStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
