import { TestBed } from '@angular/core/testing';

import { EconomicGroupService } from './economic-group.service';

describe('EconomicGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EconomicGroupService = TestBed.get(EconomicGroupService);
    expect(service).toBeTruthy();
  });
});
