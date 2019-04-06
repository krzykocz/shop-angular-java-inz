import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerCreateUpdateComponent } from './manufacturer-create-update.component';

describe('ManufacturerCreateUpdateComponent', () => {
  let component: ManufacturerCreateUpdateComponent;
  let fixture: ComponentFixture<ManufacturerCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
