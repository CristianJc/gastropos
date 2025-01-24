import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "../../models/order.model";
import { OrderItem } from "../..//models/table.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private apiUrl = `${environment.apiRender}`;
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`, {
      headers: this.headers,
    });
  }
  getOrdersAlt(status?: string): Observable<Order[]> {
    const url = status
      ? `${this.apiUrl}/orders?status=${status}`
      : `${this.apiUrl}/orders`;
    return this.http.get<Order[]>(url);
  }
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`, {
      headers: this.headers,
    });
  }
  updateOrderStatus(orderId: number, status: Order["status"]): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${orderId}/status`, {
      headers: this.headers,
      status,
    });
  }
  addItemsToOrder(orderId: number, items: OrderItem[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/items`, {
      items,
      headers: this.headers,
    });
  }
  updateOrderItem(
    orderId: number,
    itemId: number,
    updates: Partial<OrderItem>
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/orders/${orderId}/items/${itemId}`,
      updates,
      { headers: this.headers }
    );
  }

  deleteOrderItem(orderId: number, itemId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/orders/${orderId}/items/${itemId}`,
      { headers: this.headers }
    );
  }
  getOrdersByStatus(status: Order["status"]): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders?status=${status}`, {
      headers: this.headers,
    });
  }
}
