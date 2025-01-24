// sales-reports.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class SalesReportsService {
  private apiUrl = `${environment.apiRender}`;

  constructor(private http: HttpClient) {}

  getDailySales(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily-sales`, {
      params: new HttpParams().set("date", date),
    });
  }

  getSalesByDateRange(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales-by-date-range`, {
      params: new HttpParams()
        .set("startDate", startDate)
        .set("endDate", endDate),
    });
  }

  getSalesByTable(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales-by-table`, {
      params: new HttpParams().set("date", date),
    });
  }

  getDetailedSales(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/detailed-sales`, {
      params: new HttpParams()
        .set("startDate", startDate)
        .set("endDate", endDate),
    });
  }
}
