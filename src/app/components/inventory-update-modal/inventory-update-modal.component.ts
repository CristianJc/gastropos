import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Inventory } from "../../models/inventory.model";
import { InventoryService } from "../../services/inventary/inventary.service";

@Component({
  selector: "app-inventory-update-modal",
  templateUrl: "./inventory-update-modal.component.html",
  styleUrls: ["./inventory-update-modal.component.scss"],
})
export class InventoryUpdateModalComponent {
  @Input() show = false;
  @Input() inventoryItem?: Inventory;
  @Output() closeModal = new EventEmitter<void>();
  @Output() inventoryUpdated = new EventEmitter<void>();

  updateForm: FormGroup;
  submitted = false;
  error = "";
  success = "";

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.updateForm = this.fb.group({
      quantity: ["", [Validators.required, Validators.min(0)]],
      reason: ["", Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.inventoryItem) {
      this.updateForm.patchValue({
        quantity: this.inventoryItem.quantity,
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = "";
    this.success = "";

    if (this.updateForm.valid && this.inventoryItem) {
      const updatedItem = {
        ...this.inventoryItem,
        quantity: this.updateForm.value.quantity,
        last_updated: new Date().toISOString(),
      };

      this.inventoryService
        .updateInventoryItem(this.inventoryItem.id!, updatedItem)
        .subscribe({
          next: () => {
            this.success = "Inventario actualizado exitosamente";
            this.inventoryUpdated.emit();
            setTimeout(() => this.close(), 1500);
          },
          error: (error) => {
            this.error = "Error al actualizar el inventario";
            console.error("Error:", error);
          },
        });
    }
  }

  close(): void {
    this.show = false;
    this.closeModal.emit();
    this.submitted = false;
    this.error = "";
    this.success = "";
    this.updateForm.reset();
  }
}
