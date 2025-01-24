import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorioComponent } from './inventorio.component';

describe('InventorioComponent', () => {
  let component: InventorioComponent;
  let fixture: ComponentFixture<InventorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventorioComponent]
    });
    fixture = TestBed.createComponent(InventorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
