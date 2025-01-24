import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "../../models/order.model";
import { OrderItem } from "../..//models/table.model";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }
  getOrdersAlt(status?: string): Observable<Order[]> {
    const url = status
      ? `${this.apiUrl}/orders?status=${status}`
      : `${this.apiUrl}/orders`;
    return this.http.get<Order[]>(url);
  }
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }
  updateOrderStatus(orderId: number, status: Order["status"]): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${orderId}/status`, {
      status,
    });
  }
  addItemsToOrder(orderId: number, items: OrderItem[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/items`, { items });
  }
  updateOrderItem(
    orderId: number,
    itemId: number,
    updates: Partial<OrderItem>
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/orders/${orderId}/items/${itemId}`,
      updates
    );
  }

  deleteOrderItem(orderId: number, itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${orderId}/items/${itemId}`);
  }
  getOrdersByStatus(status: Order["status"]): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders?status=${status}`);
  }
}
