import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDataTable } from './common-data-table';

describe('CommonDataTable', () => {
  let component: CommonDataTable;
  let fixture: ComponentFixture<CommonDataTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonDataTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDataTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
