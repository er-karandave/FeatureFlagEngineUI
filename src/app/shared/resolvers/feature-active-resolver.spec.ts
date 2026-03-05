import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { featureActiveResolver } from './feature-active-resolver';

describe('featureActiveResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => featureActiveResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
