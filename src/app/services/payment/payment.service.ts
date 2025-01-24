import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Payment } from "../../models/payment.model";
import { Order } from "../../models/order.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private apiUrl = `${environment.apiRender}`;
  private dailyEarnings = new BehaviorSubject<number>(0);
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {
    this.calculateDailyEarnings();
  }

  private calculateDailyEarnings() {
    // Aquí podrías hacer una llamada a tu API para obtener las ganancias del día
    this.getCompletedOrders().subscribe((orders) => {
      const total = orders.reduce((sum, order) => sum + order.total_amount, 0);
      this.dailyEarnings.next(total);
    });
  }

  getCompletedOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders?status=delivered`, {
      headers: this.headers,
    });
  }
  getCompletedOrdersNotInvoiced(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/not-invoiced`, {
      headers: this.headers,
    });
  }
  getDailyEarnings(): Observable<number> {
    return this.dailyEarnings.asObservable();
  }
}
