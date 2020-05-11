import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderingState } from "@rota/core/models/app-state";

const selectOrderingState = createFeatureSelector<OrderingState>("ordering");

const getSelectedTable = (state: OrderingState) => state.selectedTable;
const getCart = (state: OrderingState) => state.cart;

export const selectSelectedTable = createSelector(selectOrderingState, getSelectedTable);
export const selectCart = createSelector(selectOrderingState, getCart);
