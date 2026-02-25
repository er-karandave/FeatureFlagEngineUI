import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRole } from './add-edit-role';

describe('AddEditRole', () => {
  let component: AddEditRole;
  let fixture: ComponentFixture<AddEditRole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditRole]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
