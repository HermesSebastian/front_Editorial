import { TestBed } from '@angular/core/testing';

import { TipopublicacionService } from './tipopublicacion.service';

describe('TipopublicacionService', () => {
  let service: TipopublicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipopublicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
