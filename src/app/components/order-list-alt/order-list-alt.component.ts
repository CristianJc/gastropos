import { Component } from "@angular/core";
import { Order } from "../../models/order.model";
import { OrderService } from "../../services/order/order.service.ts.service";

@Component({
  selector: "app-order-list-alt",
  templateUrl: "./order-list-alt.component.html",
  styleUrls: ["./order-list-alt.component.scss"],
})
export class OrderListAltComponent {
  orders: Order[] = [];
  selectedStatus: string = "";
  statusOptions: Order["status"][] = [
    "pending",
    "preparing",
    "ready",
    "delivered",
    "cancelled",
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrdersAlt(this.selectedStatus).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (error) => {
        console.error("Error loading orders:", error);
        // Aquí podrías agregar un manejo de errores más elaborado
      },
    });
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.loadOrders();
  }

  updateOrderStatus(order: Order, newStatus: Order["status"]): void {
    this.orderService.updateOrderStatus(order.id!, newStatus).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error) => {
        console.error("Error updating order status:", error);
      },
    });
  }
}
