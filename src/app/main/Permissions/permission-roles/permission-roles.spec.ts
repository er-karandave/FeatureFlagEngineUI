import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRoles } from './permission-roles';

describe('PermissionRoles', () => {
  let component: PermissionRoles;
  let fixture: ComponentFixture<PermissionRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionRoles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
