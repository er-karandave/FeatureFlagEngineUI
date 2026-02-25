import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionListing } from './permission-listing';

describe('PermissionListing', () => {
  let component: PermissionListing;
  let fixture: ComponentFixture<PermissionListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
