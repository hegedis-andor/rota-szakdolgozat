import { OrderingState } from "@rota/core/models/app-state";

export const initialState: OrderingState = {
  selectedTable: null,
  cart: {
    items: []
  }
};
