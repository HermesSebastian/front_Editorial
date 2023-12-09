import { TestBed } from '@angular/core/testing';

import { AutorpublicacionService } from './autorpublicacion.service';

describe('AutorpublicacionService', () => {
  let service: AutorpublicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorpublicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
