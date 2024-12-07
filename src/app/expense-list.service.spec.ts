import { TestBed } from '@angular/core/testing';

import { ExpenseListService } from './expense-list.service';

describe('ExpenseListService', () => {
  let service: ExpenseListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
