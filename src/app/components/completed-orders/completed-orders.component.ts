import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { PaymentService } from "../../services/payment/payment.service";
import { Order } from "../../models/order.model";
import { Payment } from "../../models/payment.model";
import { ReceiptService } from "../../services/receipt/receipt.service";
import { FacturaService } from "../../services/factura/factura.service";
import { OrderItem } from "app/models/table.model";

@Component({
  selector: "app-completed-orders",
  templateUrl: "./completed-orders.component.html",
  styleUrls: ["./completed-orders.component.scss"],
})
export class CompletedOrdersComponent implements OnInit {
  completedOrders: Order[] = [];
  dataSource = new MatTableDataSource<Order>();
  payments: Map<number, Payment> = new Map();
  dailyTotal$ = new BehaviorSubject<number>(0);
  dailyEarnings$ = new BehaviorSubject<number>(0);
  selectedDate: Date = new Date();
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  amountPaid: number = 0;
  change: number = 0;
  displayedColumns: string[] = [
    "orderId",
    "table",
    "items",
    "total",
    "payment",
    "profit",
    "actions",
  ];

  constructor(
    private paymentService: PaymentService,
    private receiptService: ReceiptService,
    private facturaService: FacturaService
  ) {}

  ngOnInit() {
    this.loadCompletedOrders();
    this.loadDailyEarnings();
  }

  loadCompletedOrders() {
    this.paymentService.getCompletedOrdersNotInvoiced().subscribe({
      next: (orders) => {
        this.completedOrders = orders;
        this.dataSource.data = orders;
        this.calculateDailyTotal();
      },
      error: (error) => console.error("Error loading completed orders:", error),
    });
  }
  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.amountPaid = 0;
    this.change = 0;
  }
  decreaseQuantity(item: OrderItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: OrderItem): void {
    item.quantity++;
  }

  deleteItem(item: OrderItem): void {
    // const index = this.orderItems.indexOf(item);
    // if (index > -1) {
    //   this.orderItems.splice(index, 1);
    // }
  }
  calculateChange() {
    if (!this.selectedOrder || !this.amountPaid) {
      this.change = 0;
      return;
    }
    this.change = this.amountPaid - this.selectedOrder.total_amount;
  }

  processPayment() {
    if (!this.selectedOrder || !this.amountPaid) {
      return;
    }
    // Add your payment processing logic here
    console.log("Processing payment for order:", this.selectedOrder.id);
  }
  loadDailyEarnings() {
    this.paymentService.getDailyEarnings().subscribe({
      next: (earnings) => {
        this.dailyEarnings$.next(earnings);
      },
      error: (error) => console.error("Error loading daily earnings:", error),
    });
  }

  calculateDailyTotal() {
    const total = this.completedOrders.reduce(
      (sum, order) => sum + order.total_amount,
      0
    );
    this.dailyTotal$.next(total);
  }
  formatCurrency(inputElement: HTMLInputElement): void {
    let value = inputElement.value;

    // Eliminar cualquier carácter que no sea número o punto
    value = value.replace(/[^0-9.]/g, "");

    // Convertir a número y formatear con separadores de miles y dos decimales
    const parts = parseFloat(value)
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .split(".");

    // Actualizar el valor del input
    inputElement.value = parts.join(".");
  }
  calculatePayment(order: Order, amountPaid: string) {
    const paid = parseFloat(amountPaid);
    if (isNaN(paid)) return;

    const payment: Payment = {
      orderId: order.id!,
      totalAmount: order.total_amount,
      amountPaid: paid,
      change: paid - order.total_amount,
      paymentMethod: "cash",
      paymentDate: new Date(),
      completed: true,
    };

    this.payments.set(order.id!, payment);
    this.dataSource.data = [...this.completedOrders];

    // Preparar datos de factura
    const facturaData = {
      orden_id: order.id,
      total: order.total_amount,
      cantidad_pagada: paid,
      fecha_hora: new Date(),
      cambio: payment.change,
      utilidad: this.calculateProfit(order),
      estado: "pagada",
      mesa_id: order.table_number,
      metodo_pago: payment.paymentMethod,
      usuario_id: 1, // Considera obtener esto de un servicio de autenticación
    };

    // Guardar factura
    // this.saveFactura(facturaData, order.id!);
  }

  saveFactura(facturaData: any, orderId: number) {
    this.facturaService.postSaveFactura(facturaData).subscribe({
      next: (response) => {
        console.log("Factura saved successfully:", response);
        // Marcar el pago como completado
        const payment = this.payments.get(orderId);
        if (payment) {
          payment.completed = true;
          this.payments.set(orderId, payment);
        }
        // Actualizar la vista
        this.dataSource.data = [...this.completedOrders];
        // Recargar totales
        this.loadDailyEarnings();
        this.calculateDailyTotal();
      },
      error: (error) => {
        console.error("Error saving factura:", error);
        // Aquí podrías agregar una notificación de error al usuario
      },
    });
  }

  calculateProfit(order: Order): number {
    // Mantenemos tu lógica actual de cálculo de utilidad
    return order.total_amount * 0.3;
  }

  printReceipt(order: Order): void {
    const payment = this.payments.get(order.id!);
    this.receiptService.printReceipt(order, payment);
  }

  // Método auxiliar para verificar si un pago está completo
  isPaymentCompleted(orderId: number): boolean {
    const payment = this.payments.get(orderId);
    return payment?.completed ?? false;
  }

  // Método para verificar si se puede mostrar el botón de guardar
  canShowSaveButton(orderId: number): boolean {
    const payment = this.payments.get(orderId);
    return payment !== undefined && !payment.completed;
  }
}
