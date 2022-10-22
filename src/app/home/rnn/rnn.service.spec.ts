import { TestBed } from '@angular/core/testing';

import { RnnService } from './rnn.service';

describe('RnnService', () => {
  let service: RnnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
