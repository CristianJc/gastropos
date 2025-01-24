import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class FacturaService {
  private apiUrl = `${environment.apiRender}/facturas`; // Cambiar con tu URL real

  constructor(private http: HttpClient) {}

  getFacturasPorEstado(estado: string): Observable<any> {
    const params = new HttpParams().set("estado", estado);
    return this.http.get<any>(`${this.apiUrl}/por-estado`, { params });
  }
  postSaveFactura(facturaData: any) {
    return this.http.post(`${this.apiUrl}`, facturaData);
  }
  getTodasLasFacturas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getFacturasPorFecha(fechaInicio: string, fechaFin: string): Observable<any> {
    const params = new HttpParams()
      .set("fechaInicio", fechaInicio)
      .set("fechaFin", fechaFin);
    return this.http.get<any>(`${this.apiUrl}/por-fecha`, { params });
  }
}
