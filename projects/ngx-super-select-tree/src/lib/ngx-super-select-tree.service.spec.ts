import { TestBed } from '@angular/core/testing';

import { NgxSuperSelectTreeService } from './ngx-super-select-tree.service';

describe('NgxSuperSelectTreeService', () => {
  let service: NgxSuperSelectTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSuperSelectTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
