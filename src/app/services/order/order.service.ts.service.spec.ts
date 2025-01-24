import { TestBed } from '@angular/core/testing';

import { OrderServiceTsService } from './order.service.ts.service';

describe('OrderServiceTsService', () => {
  let service: OrderServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
