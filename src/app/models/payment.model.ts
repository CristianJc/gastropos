export interface Payment {
  orderId: number;
  totalAmount: number;
  amountPaid: number;
  change: number;
  paymentMethod: 'cash' | 'card';
  paymentDate: Date;
  completed: boolean;
}
