import { TestBed } from '@angular/core/testing';

import { SortSearchService } from './sort-search.service';

describe('SortSearchService', () => {
  let service: SortSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
