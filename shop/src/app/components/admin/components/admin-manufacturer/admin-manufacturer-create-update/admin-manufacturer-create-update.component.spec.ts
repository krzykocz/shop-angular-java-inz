import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManufacturerCreateUpdateComponent } from './admin-manufacturer-create-update.component';

describe('AdminManufacturerCreateUpdateComponent', () => {
  let component: AdminManufacturerCreateUpdateComponent;
  let fixture: ComponentFixture<AdminManufacturerCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManufacturerCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManufacturerCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
