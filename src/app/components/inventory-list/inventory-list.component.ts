// src/app/components/inventory-list/inventory-list.component.ts
import { Component, OnInit } from "@angular/core";
import { Inventory } from "../../models/inventory.model";
import { InventoryService } from "../../services/inventary/inventary.service";

@Component({
  selector: "app-inventory-list",
  templateUrl: "./inventory-list.component.html",
  styleUrls: ["./inventory-list.component.scss"],
})
export class InventoryListComponent implements OnInit {
  inventoryItems: Inventory[] = [];
  loading = false;
  error = "";
  alerts: Inventory[] = [];

  // Modal properties
  showUpdateModal = false;
  selectedItem?: Inventory;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
    this.loadAlerts();
  }

  loadInventory(): void {
    this.loading = true;
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        console.log(data);
        this.inventoryItems = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Error al cargar inventario";
        this.loading = false;
        console.error("Error:", error);
      },
    });
  }

  loadAlerts(): void {
    this.inventoryService.getInventoryAlerts().subscribe({
      next: (data) => {
        this.alerts = data;
      },
      error: (error) => {
        console.error("Error loading alerts:", error);
      },
    });
  }

  openUpdateModal(item: Inventory): void {
    this.selectedItem = item;
    this.showUpdateModal = true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
    this.selectedItem = undefined;
  }

  onInventoryUpdated(): void {
    this.loadInventory();
    this.loadAlerts();
  }
}
