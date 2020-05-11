export interface Order {
  id: string;
  items: OrderItem[];
  status: "active" | "done";
  tableName: string;
  timestamp: number;
}

export interface OrderItem {
  name: string;
  amount: number;
  status: OrderItemStatus;
}

export type OrderItemStatus = "ready" | "rejected" | "preparing";
