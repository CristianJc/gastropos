import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Payment } from '../../models/payment.model';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000';
  private dailyEarnings = new BehaviorSubject<number>(0);

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
    return this.http.get<Order[]>(`${this.apiUrl}/orders?status=delivered`);
  }
  getCompletedOrdersNotInvoiced(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/not-invoiced`);
  }
  getDailyEarnings(): Observable<number> {
    return this.dailyEarnings.asObservable();
  }
}
