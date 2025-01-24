import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order/order.service.ts.service";
import { Order } from "../../models/order.model";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  orders: {
    pending: Order[];
    preparing: Order[];
    ready: Order[];
    delivered: Order[];
    cancelled: Order[];
  } = {
    pending: [],
    preparing: [],
    ready: [],
    delivered: [],
    cancelled: [],
  };

  loading = false;
  error = "";

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = "";

    // Load orders for each status
    const statuses: Order["status"][] = ["pending", "preparing", "ready"];

    Promise.all(
      statuses.map((status) =>
        this.orderService.getOrdersByStatus(status).toPromise()
      )
    )
      .then((results) => {
        results.forEach((orders, index) => {
          const status = statuses[index];
          this.orders[status] = orders || [];
        });
        this.loading = false;
      })
      .catch((err) => {
        this.error = "Error al cargar las órdenes";
        this.loading = false;
        console.error(err);
      });
  }

  updateStatus(order: Order, newStatus: Order["status"]) {
    this.orderService.updateOrderStatus(order.id!, newStatus).subscribe({
      next: () => {
        // Remove from current status array
        const currentStatus = order.status;
        this.orders[currentStatus] = this.orders[currentStatus].filter(
          (o) => o.id !== order.id
        );

        // Add to new status array if it's not delivered/cancelled
        if (newStatus !== "delivered" && newStatus !== "cancelled") {
          order.status = newStatus;
          this.orders[newStatus].push(order);
        }
      },
      error: (err) => {
        console.error("Error al actualizar el estado:", err);
        this.error = "Error al actualizar el estado de la orden";
      },
    });
  }

  getNextStatus(currentStatus: Order["status"]): Order["status"] | null {
    const flow: Record<Order["status"], Order["status"] | null> = {
      pending: "preparing",
      preparing: "ready",
      ready: "delivered",
      delivered: "delivered",
      cancelled: "cancelled",
    };

    return flow[currentStatus];
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  calculateTotal(order: Order): number {
    return (
      order.orderItems?.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ) || 0
    );
  }
}
