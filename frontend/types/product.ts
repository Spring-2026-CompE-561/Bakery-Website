// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  img: string;
  picture_url: string;
  badge: string | null;
  is_available: boolean;
}