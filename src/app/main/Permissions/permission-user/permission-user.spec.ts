import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionUser } from './permission-user';

describe('PermissionUser', () => {
  let component: PermissionUser;
  let fixture: ComponentFixture<PermissionUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
