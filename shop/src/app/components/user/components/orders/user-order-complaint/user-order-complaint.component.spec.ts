import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderComplaintComponent } from './user-order-complaint.component';

describe('UserOrderComplaintComponent', () => {
  let component: UserOrderComplaintComponent;
  let fixture: ComponentFixture<UserOrderComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
