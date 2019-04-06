import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductCreateUpdateComponent } from './admin-product-create-update.component';

describe('AdminProductCreateUpdateComponent', () => {
  let component: AdminProductCreateUpdateComponent;
  let fixture: ComponentFixture<AdminProductCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
