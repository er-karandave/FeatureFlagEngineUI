import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermission } from './view-permission';

describe('ViewPermission', () => {
  let component: ViewPermission;
  let fixture: ComponentFixture<ViewPermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPermission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPermission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
