import { Component, Input, OnInit } from "@angular/core";
import { Order } from "../../models/order.model";
import { Payment } from "../../models/payment.model";
import { ReceiptService } from "../../services/receipt/receipt.service";

@Component({
  selector: "app-receipt-preview",
  template: `
    <!-- <mat-card class="receipt-preview">
      <mat-card-header>
        <mat-card-title>
          Previsualización de Ticket #{{ order.id }}
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <pre>{{ receiptContent }}</pre>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="print()">
          <mat-icon>print</mat-icon>
          Imprimir
        </button>
      </mat-card-actions>
    </mat-card> -->
  `,
  styles: [
    `
      .receipt-preview {
        max-width: 400px;
        margin: 20px;
      }
      pre {
        font-family: monospace;
        white-space: pre-wrap;
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 4px;
      }
    `,
  ],
})
export class ReceiptPreviewComponent implements OnInit {
  @Input() order!: Order;
  @Input() payment?: Payment;
  receiptContent: string = "";

  constructor(private receiptService: ReceiptService) {}

  ngOnInit() {
    this.generateReceipt();
  }

  generateReceipt() {
    this.receiptContent = this.receiptService.generateReceiptContent(
      this.order,
      this.payment
    );
  }

  print() {
    this.receiptService.printReceipt(this.order, this.payment);
  }
}
