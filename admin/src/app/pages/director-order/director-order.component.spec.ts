import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorOrderComponent } from './director-order.component';

describe('DirectorOrderComponent', () => {
  let component: DirectorOrderComponent;
  let fixture: ComponentFixture<DirectorOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
