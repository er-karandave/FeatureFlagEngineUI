import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFeatures } from './add-edit-features';

describe('AddEditFeatures', () => {
  let component: AddEditFeatures;
  let fixture: ComponentFixture<AddEditFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditFeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
