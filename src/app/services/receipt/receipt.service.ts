import { Injectable } from '@angular/core';
import { Order } from '../../models/order.model';
import { Payment } from '../../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  private businessInfo = {
    name: 'Mi Restaurante',
    address: 'Dirección del Restaurante',
    phone: '(123) 456-7890',
    taxId: 'RFC-XXXX-000000',
  };

  generateReceiptContent(order: Order, payment?: Payment): string {
    const date = new Date().toLocaleString();
    const orderDate = new Date(order.created_at!).toLocaleString();

    let content = `
${this.businessInfo.name}
${this.businessInfo.address}
Tel: ${this.businessInfo.phone}
${this.businessInfo.taxId}
----------------------------------------
Ticket de Venta #${order.id}
Fecha: ${date}
Mesa: ${order.table_number}
Orden creada: ${orderDate}
----------------------------------------
PRODUCTOS
----------------------------------------\n`;

    // Agregar items
    order.orderItems?.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      content += `${item.product_name}
${item.quantity} x $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}
${item.notes ? `Notas: ${item.notes}\n` : ''}\n`;
    });

    content += `----------------------------------------
Subtotal: $${order.total_amount.toFixed(2)}
IVA (16%): $${(order.total_amount * 0.16).toFixed(2)}
Total: $${order.total_amount.toFixed(2)}`;

    if (payment) {
      content += `\n
Pago recibido: $${payment.amountPaid.toFixed(2)}
Cambio: $${payment.change.toFixed(2)}`;
    }

    content += `\n
----------------------------------------
¡Gracias por su preferencia!
Lo esperamos pronto
`;

    return content;
  }

  printReceipt(order: Order, payment?: Payment): void {
    const content = this.generateReceiptContent(order, payment);

    // Crear un elemento oculto para imprimir
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
                <html>
                    <head>
                        <title>Ticket #${order.id}</title>
                        <style>
                            body {
                                font-family: monospace;
                                font-size: 12px;
                                width: 300px;
                                margin: 0 auto;
                                padding: 10px;
                            }
                            pre {
                                white-space: pre-wrap;
                                margin: 0;
                            }
                            @media print {
                                body {
                                    width: 80mm; /* Ancho típico de ticket */
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <pre>${content}</pre>
                        <script>
                            window.onload = function() {
                                window.print();
                                setTimeout(function() {
                                    window.close();
                                }, 500);
                            };
                        </script>
                    </body>
                </html>
            `);
      printWindow.document.close();
    }
  }
}
