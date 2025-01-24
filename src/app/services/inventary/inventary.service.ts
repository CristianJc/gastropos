import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Inventory } from "../../models/inventory.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  private apiUrl = `${environment.apiRender}/inventory`;
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl, { headers: this.headers });
  }

  addInventoryItem(item: Inventory): Observable<any> {
    return this.http.post(this.apiUrl, item, { headers: this.headers });
  }

  updateInventoryItem(id: number, item: Inventory): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item, {
      headers: this.headers,
    });
  }

  getInventoryAlerts(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/alerts`, {
      headers: this.headers,
    });
  }
}
