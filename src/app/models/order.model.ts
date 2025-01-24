import { OrderItem } from './table.model';

export interface Order {
  id?: number;
  table_id: number;
  order_type: 'table' | 'takeout' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  customer_name?: string;
  table_number?: number;
  total_amount: number;
  created_at?: string;
  orderItems?: OrderItem[];
}
