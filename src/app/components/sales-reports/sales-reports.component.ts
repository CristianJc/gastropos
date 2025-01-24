// sales-reports.component.ts
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Chart } from "chart.js/auto";
import { SalesReportsService } from "../../services/sales-reports/sales-reports.service";

@Component({
  selector: "app-sales-reports",
  templateUrl: "./sales-reports.component.html",
  styleUrls: ["./sales-reports.component.scss"],
})
export class SalesReportsComponent implements OnInit {
  filterForm: FormGroup;
  totalSales = 0;
  totalProfit = 0;
  totalInvoices = 0;
  tableHeaders: string[] = [];
  tableData: any[] = [];
  private salesChart: Chart | null = null;
  private productsChart: Chart | null = null;

  constructor(
    private fb: FormBuilder,
    private salesReportsService: SalesReportsService
  ) {
    this.filterForm = this.fb.group({
      reportType: ["daily"],
      date: [new Date().toISOString().split("T")[0]],
      startDate: [null],
      endDate: [null],
    });
  }

  ngOnInit() {
    this.generateReport();
  }

  showDateFilter() {
    return ["daily", "by-table"].includes(
      this.filterForm.get("reportType")?.value
    );
  }

  showDateRangeFilter() {
    return ["date-range", "detailed"].includes(
      this.filterForm.get("reportType")?.value
    );
  }

  generateReport() {
    const formValues = this.filterForm.value;

    switch (formValues.reportType) {
      case "daily":
        this.salesReportsService
          .getDailySales(formValues.date)
          .subscribe((data) => this.updateDashboard(data));
        break;
      case "date-range":
        this.salesReportsService
          .getSalesByDateRange(formValues.startDate, formValues.endDate)
          .subscribe((data) => this.updateDashboard(data));
        break;
      case "by-table":
        this.salesReportsService
          .getSalesByTable(formValues.date)
          .subscribe((data) => this.updateDashboard(data));
        break;
      case "detailed":
        this.salesReportsService
          .getDetailedSales(formValues.startDate, formValues.endDate)
          .subscribe((data) => this.updateDashboard(data));
        break;
    }
  }

  private updateDashboard(data: any[]) {
    // Update summary metrics
    this.totalSales = data.reduce(
      (sum, row) => sum + (row.total_ventas || 0),
      0
    );
    this.totalProfit = data.reduce(
      (sum, row) => sum + (row.total_utilidad || 0),
      0
    );
    this.totalInvoices = data.reduce(
      (sum, row) => sum + (row.numero_facturas || 0),
      0
    );

    // Update table
    if (data.length > 0) {
      this.tableHeaders = Object.keys(data[0]).map((key) =>
        key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
      this.tableData = data;
    }

    // Update charts
    this.updateCharts(data);
  }

  private updateCharts(data: any[]) {
    // Destroy existing charts
    if (this.salesChart) this.salesChart.destroy();
    if (this.productsChart) this.productsChart.destroy();

    // Create sales chart
    this.salesChart = new Chart("salesChart", {
      type: "line",
      data: {
        labels: data.map((row) => row.fecha || row.numero_mesa),
        datasets: [
          {
            label: "Ventas",
            data: data.map((row) => row.total_ventas),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Tendencia de Ventas",
          },
        },
      },
    });

    // Create products chart (for detailed reports)
    if (this.filterForm.get("reportType")?.value === "detailed") {
      this.productsChart = new Chart("productsChart", {
        type: "bar",
        data: {
          labels: data.slice(0, 10).map((row) => row.producto),
          datasets: [
            {
              label: "Ventas por Producto",
              data: data.slice(0, 10).map((row) => row.total_ventas),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Top 10 Productos",
            },
          },
        },
      });
    }
  }
}
