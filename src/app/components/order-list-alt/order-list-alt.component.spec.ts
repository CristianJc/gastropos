import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListAltComponent } from './order-list-alt.component';

describe('OrderListAltComponent', () => {
  let component: OrderListAltComponent;
  let fixture: ComponentFixture<OrderListAltComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListAltComponent]
    });
    fixture = TestBed.createComponent(OrderListAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
