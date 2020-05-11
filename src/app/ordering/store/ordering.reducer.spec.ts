import { CartItem, Table } from "@rota/core/models";
import { OrderingStoreActions } from "./index";
import { orderingReducer } from "./ordering.reducer";
import { initialState } from "./ordering.state";

fdescribe("OrderingReducer", () => {
  const cartItem = <CartItem> { product: { id: "p-01" }, amount: 2 };
  const cartItem2 = <CartItem> { product: { id: "p-02" } };

  it("should return new state with selected table, on setSelectedTable", () => {
    const table = <Table> { id: "t01" };
    const state = orderingReducer(initialState, OrderingStoreActions.setSelectedTable({ table }));
    expect(state).toEqual({ ...initialState, selectedTable: table });
  });

  it("should return new state with the added cartitem in the cart, on addToCart", () => {
    const expectedState = { ...initialState, cart: { items: [cartItem] } };
    const state = orderingReducer(initialState, OrderingStoreActions.addToCart({ cartItem }));
    expect(state).toEqual(expectedState);
  });

  it("should return new state where cartItem's amount is increased if it is already in cart, on addToCart", () => {
    const initState = { ...initialState, cart: { items: [cartItem] } };
    const expectedState = { ...initState, cart: { items: [{ ...cartItem, amount: 4 }] } };
    const state = orderingReducer(initState, OrderingStoreActions.addToCart({ cartItem }));
    expect(state).toEqual(expectedState);
  });

  it("should return new state where cartItem's amount is updated, on updateCartItemAmount", () => {
    const initState = { ...initialState, cart: { items: [{ ...cartItem2, amount: 5 }] } };
    const expectedState = { ...initState, cart: { items: [{ ...cartItem2, amount: 2 }] } };
    const state = orderingReducer(initState, OrderingStoreActions.updateCartItemAmount({ cartItem: { ...cartItem2, amount: 2 } }));
    expect(state).toEqual(expectedState);
  });

  it("should return new state where cartItem is removed, on removeItemFromCart", () => {
    const initState = { ...initialState, cart: { items: [cartItem, cartItem2] } };
    const expectedState = { ...initState, cart: { items: [cartItem2] } };
    const state = orderingReducer(initState, OrderingStoreActions.removeItemFromCart({ cartItem }));
    expect(state).toEqual(expectedState);
  });

  it("should return new state where cartItems are removed, on removeAlltemFromCart", () => {
    const initState = { ...initialState, cart: { items: [cartItem, cartItem2] } };
    const expectedState = { ...initState, cart: { items: [] } };
    const state = orderingReducer(initState, OrderingStoreActions.removeAlltemFromCart());
    expect(state).toEqual(expectedState);
  });

  it("should return the initialState, on orderSuccessfullyPlaced", () => {
    const initState = { ...initialState, cart: { items: [cartItem, cartItem2] } };
    const state = orderingReducer(initState, OrderingStoreActions.orderSuccessfullyPlaced());
    expect(state).toEqual(initialState);
  });
});
