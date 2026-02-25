import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListing } from './role-listing';

describe('RoleListing', () => {
  let component: RoleListing;
  let fixture: ComponentFixture<RoleListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
