import { Component } from "@angular/core";
import { Product } from "../../models/product.model";
import { OrderItem, Table } from "../../models/table.model";
import { ProductService } from "../../services/product/product.service";
import { TableService } from "../../services/table/table.service";

@Component({
  selector: "app-mesas",
  templateUrl: "./mesas.component.html",
  styleUrls: ["./mesas.component.scss"],
})
export class MesasComponent {
  getProductName(productId: number): string {
    const product = this.availableProducts.find((p) => p.id === productId);
    return product ? product.name : "Unknown Product";
  }
  tables: Table[] = [];
  selectedTable: Table | null = null;
  searchQuery: string = "";
  availableProducts: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  error = "";

  constructor(
    private tableService: TableService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadTables();
    this.loadProducts();
  }

  loadTables() {
    this.loading = true;
    this.tableService.getTables().subscribe({
      next: (data: any) => {
        console.log(data);
        this.tables = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = "Error al cargar las mesas";
        this.loading = false;
        console.error(err);
      },
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.availableProducts = data;
        this.filteredProducts = data;
      },
      error: (err) => {
        console.error("Error al cargar productos:", err);
      },
    });
  }

  selectTable(table: Table) {
    this.selectedTable = table;
    // Cargar items del localStorage
    const localItems = this.tableService.getTableItemsLocally(table.id);
    if (localItems.length > 0) {
      this.selectedTable.orderItems = localItems;
    }
  }

  filterProducts() {
    this.filteredProducts = this.availableProducts.filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addProduct(product: Product) {
    if (this.selectedTable) {
      const orderItem: OrderItem = {
        product_id: product.id!,
        quantity: 1,
        price: product.price,
      };

      if (!this.selectedTable.orderItems) {
        this.selectedTable.orderItems = [];
      }

      this.selectedTable.orderItems.push(orderItem);
      this.tableService.saveTableItemsLocally(
        this.selectedTable.id,
        this.selectedTable.orderItems
      );
    }
  }

  removeProduct(index: number) {
    if (this.selectedTable && this.selectedTable.orderItems) {
      this.selectedTable.orderItems.splice(index, 1);
      this.tableService.saveTableItemsLocally(
        this.selectedTable.id,
        this.selectedTable.orderItems
      );
    }
  }

  getTotal(): number {
    if (!this.selectedTable?.orderItems) return 0;
    return this.selectedTable.orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  saveOrder() {
    if (this.selectedTable && this.selectedTable.orderItems) {
      console.log(this.selectedTable, this.selectedTable.orderItems);
      this.tableService
        .createOrder(this.selectedTable.id, this.selectedTable.orderItems)
        .subscribe({
          next: (order) => {
            // Limpiar localStorage después de guardar
            this.tableService.clearTableLocal(this.selectedTable!.id);
            // Actualizar el estado de la mesa
            this.loadTables();
          },
          error: (err) => {
            console.error("Error al guardar la orden:", err);
          },
        });
    }
  }
}
