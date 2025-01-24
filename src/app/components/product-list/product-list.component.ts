import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = "";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Error al cargar productos";
        this.loading = false;
        console.error("Error:", error);
      },
    });
  }
}
