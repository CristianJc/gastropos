import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../../models/product.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = `${environment.apiRender}/products`;
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {
      headers: this.headers,
    });
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product, { headers: this.headers });
  }
}
