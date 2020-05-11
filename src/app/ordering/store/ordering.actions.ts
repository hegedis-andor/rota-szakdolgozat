import { createAction, props } from "@ngrx/store";
import { Order } from "@rota/core/models";
import { CartItem } from "@rota/core/models/cart";
import { Table } from "@rota/core/models/table";

export const setSelectedTable = createAction("[ORDERING] Set Chosen Table.", props<{ table: Table }>());
export const addToCart = createAction("[ORDERING] Add Product To Cart.", props<{ cartItem: CartItem }>());
export const updateCartItemAmount = createAction("[ORDERING] Update Cart Item Amount.", props<{ cartItem: CartItem }>());
export const removeItemFromCart = createAction("[ORDERING] Remove Item From Cart.", props<{ cartItem: CartItem }>());
export const removeAlltemFromCart = createAction("[ORDERING] Remove All Item From Cart.");
export const placeOrder = createAction("[ORDERING] Place Order.", props<{ order: Order }>());
export const orderSuccessfullyPlaced = createAction("[ORDERING] Order Successfully Placed.");
export const openSuccessSnackbar = createAction("[ORDERING] Open Success Snackbar.", props<{ text: string }>());
export const openErrorSnackbar = createAction("[ORDERING] Open Error Snackbar.", props<{ text: string }>());
