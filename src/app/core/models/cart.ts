import { Product } from "@rota/core/models/product";

export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  product: Product;
  amount: number;
}
