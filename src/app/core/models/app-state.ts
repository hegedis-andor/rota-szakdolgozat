import { Cart } from "./cart";
import { Group } from "./group";
import { Order } from "./order";
import { Product } from "./product";
import { Table } from "./table";

export interface AppState {
  restaurant: RestaurantState;
  auth: AuthState;
  ordering: OrderingState;
  resourceManagement: ResourceManagementState;
}

export interface RestaurantState {
  id: string;
  name: string;
  language: string;
  currency: string;
  tables: Table[];
  groups: Group[];
  products: Product[];
  activeOrders: Order[];
  isLoading: { tables: boolean; groups: boolean; products: boolean };
  failedResources: { tables?: boolean; groups?: boolean; products?: boolean };
  areResourcesLoaded: boolean;
}

export interface AuthState {
  error?: any;
  isLoading?: boolean;
}

export interface OrderingState {
  selectedTable: Table;
  cart: Cart;
}

export interface ResourceManagementState {
  isLoading?: boolean;
}

export interface ChefState {
  isLoading?: boolean;
}
