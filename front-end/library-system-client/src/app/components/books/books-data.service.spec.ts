import { TestBed } from '@angular/core/testing';

import { BooksDataService } from './books-data.service';

describe('BooksDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksDataService = TestBed.get(BooksDataService);
    expect(service).toBeTruthy();
  });
});
