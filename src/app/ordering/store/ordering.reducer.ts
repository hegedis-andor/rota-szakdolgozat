import { Action, createReducer, on } from "@ngrx/store";
import { OrderingState } from "@rota/core/models/app-state";
import { Cart, CartItem } from "@rota/core/models/cart";
import * as OrderingStoreActions from "./ordering.actions";
import { initialState } from "./ordering.state";

const reducer = createReducer(
  initialState,
  on(OrderingStoreActions.setSelectedTable, (state, { table }) => ({
    ...state,
    selectedTable: table,
  })),
  on(OrderingStoreActions.addToCart, (state, { cartItem }) => ({
    ...state,
    cart: updateCart(state.cart, cartItem),
  })),
  on(OrderingStoreActions.updateCartItemAmount, (state, { cartItem }) => ({
    ...state,
    cart: updateCartItemAmount(state.cart, cartItem),
  })),
  on(OrderingStoreActions.removeItemFromCart, (state, { cartItem }) => ({
    ...state,
    cart: removeItem(state.cart, cartItem),
  })),
  on(OrderingStoreActions.removeAlltemFromCart, (state) => ({
    ...state,
    cart: { items: [] },
  })),
  on(OrderingStoreActions.orderSuccessfullyPlaced, () => ({
    ...initialState,
  }))
);

export function orderingReducer(state: OrderingState | undefined, action: Action) {
  return reducer(state, action);
}

function updateCart(oldCart: Cart, itemToBeAdded: CartItem): Cart {
  if (itemAlreadyInCart(oldCart, itemToBeAdded)) {
    const items = updateItemAmount(oldCart.items, itemToBeAdded);
    return {
      items,
    };
  }

  return {
    items: [...oldCart.items, itemToBeAdded],
  };
}

function itemAlreadyInCart(oldCart: Cart, itemToBeAdded: CartItem) {
  return oldCart.items.find((item) => item.product.id === itemToBeAdded.product.id);
}

function updateItemAmount(items: CartItem[], itemToBeAdded: CartItem): CartItem[] {
  return items.map((item) => {
    if (item.product === itemToBeAdded.product) {
      return { product: item.product, amount: item.amount + itemToBeAdded.amount };
    }

    return item;
  });
}

function updateCartItemAmount(oldCart: Cart, cartItem: CartItem): Cart {
  const updatedItems = oldCart.items.map((item) => {
    if (item.product.id === cartItem.product.id) {
      return { product: item.product, amount: cartItem.amount };
    }

    return item;
  });

  return { items: updatedItems };
}

function removeItem(oldCart: Cart, cartItem: CartItem): Cart {
  return { items: oldCart.items.filter((item) => item.product !== cartItem.product) };
}
