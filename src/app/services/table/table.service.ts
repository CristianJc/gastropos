import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Table, TableOrder, OrderItem } from "../../models/table.model";

@Injectable({
  providedIn: "root",
})
export class TableService {
  private apiUrl = "https://gastropos-serv.onrender.com";
  private readonly STORAGE_KEY = "restaurant_tables";

  constructor(private http: HttpClient) {
    this.initLocalStorage();
  }

  private initLocalStorage() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/tables`).pipe(
      map((tables) => {
        const localData = this.getLocalStorage();
        return tables.map((table) => ({
          ...table,
          orderItems: localData[table.id]?.orderItems || [],
        }));
      })
    );
  }

  createOrder(tableId: number, items: OrderItem[]): Observable<TableOrder> {
    const order = {
      table_id: tableId,
      order_type: "table",
      status: "pending",
      orderItems: items,
      total_amount: this.calculateTotal(items),
    };

    return this.http.post<TableOrder>(`${this.apiUrl}/orders`, order);
  }

  private calculateTotal(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Local Storage Methods
  private getLocalStorage(): { [key: number]: { orderItems: OrderItem[] } } {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "{}");
  }

  saveTableItemsLocally(tableId: number, items: OrderItem[]) {
    const data = this.getLocalStorage();
    data[tableId] = { orderItems: items };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  getTableItemsLocally(tableId: number): OrderItem[] {
    const data = this.getLocalStorage();
    return data[tableId]?.orderItems || [];
  }

  clearTableLocal(tableId: number) {
    const data = this.getLocalStorage();
    delete data[tableId];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
}
