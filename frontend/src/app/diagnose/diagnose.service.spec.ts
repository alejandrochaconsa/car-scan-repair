import { TestBed } from '@angular/core/testing';

import { CarDiagnoseService } from './diagnose.service';

describe('CarDiagnose', () => {
  let service: CarDiagnoseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDiagnoseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
