import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryUpdateModalComponent } from './inventory-update-modal.component';

describe('InventoryUpdateModalComponent', () => {
  let component: InventoryUpdateModalComponent;
  let fixture: ComponentFixture<InventoryUpdateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryUpdateModalComponent]
    });
    fixture = TestBed.createComponent(InventoryUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
