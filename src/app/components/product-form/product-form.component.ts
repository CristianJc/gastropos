import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../services/product/product.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent {
  productForm: FormGroup;
  submitted = false;
  error = "";
  success = "";

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ["", [Validators.required]],
      description: [""],
      price: ["", [Validators.required, Validators.min(0)]],
      category: ["", Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = "";
    this.success = "";

    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe({
        next: (response) => {
          this.success = "Producto creado exitosamente";
          this.productForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          this.error = "Error al crear el producto";
          console.error("Error:", error);
        },
      });
    }
  }
}
