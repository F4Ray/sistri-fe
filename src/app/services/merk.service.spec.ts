import { TestBed } from '@angular/core/testing';

import { MerkService } from './merk.service';

describe('MerkService', () => {
  let service: MerkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
