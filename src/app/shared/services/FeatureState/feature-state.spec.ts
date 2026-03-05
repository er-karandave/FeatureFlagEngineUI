import { TestBed } from '@angular/core/testing';

import { FeatureState } from './feature-state';

describe('FeatureState', () => {
  let service: FeatureState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
