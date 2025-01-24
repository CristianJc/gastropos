export interface Inventory {
  id?: number;
  product_id: number;
  quantity: number;
  unit: string;
  min_stock: number;
  last_updated?: string;
  product?: {
    name: string;
    description: string;
  };
}
