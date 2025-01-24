import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private apiUrl = `${environment.apiRender}/orders`;
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(this.apiUrl, {
      headers: this.headers,
    });
  }
}
