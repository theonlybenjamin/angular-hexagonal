import { TestBed } from '@angular/core/testing';

import { TableProductsSelectedService } from './table-products-selected.service';

describe('TableProductsSelectedService', () => {
  let service: TableProductsSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableProductsSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
