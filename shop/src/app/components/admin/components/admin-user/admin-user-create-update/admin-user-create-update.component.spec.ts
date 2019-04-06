import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserCreateUpdateComponent } from './admin-user-create-update.component';

describe('AdminUserCreateUpdateComponent', () => {
  let component: AdminUserCreateUpdateComponent;
  let fixture: ComponentFixture<AdminUserCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
