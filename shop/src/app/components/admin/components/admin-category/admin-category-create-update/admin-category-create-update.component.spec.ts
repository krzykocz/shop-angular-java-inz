import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryCreateUpdateComponent } from './admin-category-create-update.component';

describe('AdminCategoryCreateUpdateComponent', () => {
  let component: AdminCategoryCreateUpdateComponent;
  let fixture: ComponentFixture<AdminCategoryCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
