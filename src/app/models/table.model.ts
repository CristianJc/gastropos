export interface TableOrder {
  id?: number;
  table_id: number;
  order_type: 'table';
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at?: string;
}

export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id: number;
  product_name?: number;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Table {
  id: number;
  number: number;
  status: 'free' | 'occupied' | 'reserved';
  currentOrder?: TableOrder;
  orderItems?: OrderItem[];
}
