// types/admin.ts
export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string; 
  quantity: number;
  unit_price: number;
  order_id?: number;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  total_price: number;
  status: string;
  created_at: string;
  pickup_date: string;
  pickup_time: string;
  items: OrderItem[];
}