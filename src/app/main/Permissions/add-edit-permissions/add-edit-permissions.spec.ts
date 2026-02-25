import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPermissions } from './add-edit-permissions';

describe('AddEditPermissions', () => {
  let component: AddEditPermissions;
  let fixture: ComponentFixture<AddEditPermissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditPermissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPermissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
