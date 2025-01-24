import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../../models/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/inventory';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  addInventoryItem(item: Inventory): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updateInventoryItem(id: number, item: Inventory): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  getInventoryAlerts(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/alerts`);
  }
}
