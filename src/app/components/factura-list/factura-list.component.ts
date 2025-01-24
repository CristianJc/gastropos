import { Component, OnInit } from "@angular/core";
import { FacturaService } from "../../services/factura/factura.service";

@Component({
  selector: "app-factura-list",
  templateUrl: "./factura-list.component.html",
  styleUrls: ["./factura-list.component.scss"],
})
export class FacturaListComponent implements OnInit {
  facturas: any[] = [];
  estados: string[] = ["Pendiente", "Pagada", "Cancelada"]; // Lista de estados de factura
  selectedEstado: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.obtenerTodasLasFacturas();
  }

  obtenerFacturasPorEstado(): void {
    if (this.selectedEstado) {
      this.facturaService.getFacturasPorEstado(this.selectedEstado).subscribe(
        (data) => {
          this.facturas = data;
        },
        (error) => {
          console.error("Error al obtener facturas por estado", error);
        }
      );
    }
  }

  obtenerFacturasPorFecha(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.facturaService
        .getFacturasPorFecha(this.fechaInicio, this.fechaFin)
        .subscribe(
          (data) => {
            this.facturas = data;
          },
          (error) => {
            console.error("Error al obtener facturas por fecha", error);
          }
        );
    }
  }

  obtenerTodasLasFacturas(): void {
    this.facturaService.getTodasLasFacturas().subscribe(
      (data) => {
        this.facturas = data;
      },
      (error) => {
        console.error("Error al obtener todas las facturas", error);
      }
    );
  }
}
