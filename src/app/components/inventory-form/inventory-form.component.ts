import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../services/product/product.service";
import { InventoryService } from "../../services/inventary/inventary.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-inventory-form",
  templateUrl: "./inventory-form.component.html",
  styleUrls: ["./inventory-form.component.scss"],
})
export class InventoryFormComponent implements OnInit {
  inventoryForm: FormGroup;
  products: Product[] = [];
  submitted = false;
  error = "";
  success = "";

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private inventoryService: InventoryService
  ) {
    this.inventoryForm = this.fb.group({
      product_id: ["", Validators.required],
      quantity: ["", [Validators.required, Validators.min(0)]],
      unit: ["", Validators.required],
      min_stock: ["", [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error("Error loading products:", error);
        this.error = "Error al cargar productos";
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = "";
    this.success = "";

    if (this.inventoryForm.valid) {
      this.inventoryService
        .addInventoryItem(this.inventoryForm.value)
        .subscribe({
          next: (response) => {
            this.success = "Item de inventario agregado exitosamente";
            this.inventoryForm.reset();
            this.submitted = false;
          },
          error: (error) => {
            this.error = "Error al agregar item al inventario";
            console.error("Error:", error);
          },
        });
    }
  }
}
