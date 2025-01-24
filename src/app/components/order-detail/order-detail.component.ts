import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../services/order/order.service.ts.service";
import { Order } from "../../models/order.model";
import { OrderItem } from "../../models/table.model";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  editingItem: OrderItem | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get("id");
    if (orderId) {
      this.loadOrder(+orderId);
    }
  }

  loadOrder(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe({
      next: (data) => {
        this.order = data;
      },
      error: (error) => {
        console.error("Error loading order:", error);
      },
    });
  }

  updateItem(item: OrderItem | null): void {
    if (item) {
      if (this.order && item.id) {
        this.orderService
          .updateOrderItem(this.order.id!, item.id, {
            quantity: item.quantity,
            notes: item.notes,
          })
          .subscribe({
            next: () => {
              this.loadOrder(this.order!.id!);
              this.editingItem = null;
            },
            error: (error) => {
              console.error("Error updating item:", error);
            },
          });
      }
    }
  }

  deleteItem(itemId: number): void {
    if (this.order) {
      this.orderService.deleteOrderItem(this.order.id!, itemId).subscribe({
        next: () => {
          this.loadOrder(this.order!.id!);
        },
        error: (error) => {
          console.error("Error deleting item:", error);
        },
      });
    }
  }
}
