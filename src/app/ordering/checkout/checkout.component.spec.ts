import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateModule } from "@ngx-translate/core";
import { AppState, CartItem, Order, OrderingState, OrderItem, Product, Table } from "@rota/core/models";
import { AmountSelectorModule } from "@rota/shared/amount-selector";
import { ButtonOutlinedModule } from "@rota/shared/button-outlined/button-outlined.module";
import { OrderingStoreActions } from "../store";
import { CheckoutComponent } from "./checkout.component";

fdescribe("CheckoutComponent", () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let store: MockStore<AppState>;
  const product = <Product> { name: "prod", id: "p1" };
  const cartItems: CartItem[] = [<CartItem> { amount: 1, product }];
  const selectedTable = <Table> { id: "t", name: "table" };
  const orderingState = <OrderingState> {
    selectedTable,
    cart: { items: cartItems },
  };
  const initialState = <AppState> { restaurant: {}, ordering: orderingState };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [AmountSelectorModule, TranslateModule.forRoot(), ButtonOutlinedModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
    spyOn(store, "dispatch");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should update the amount of the item in the cart", () => {
    const item = <CartItem> { amount: 1, product: { id: "p" } };
    component.updateAmount(2, item);
    expect(store.dispatch).toHaveBeenCalledWith(OrderingStoreActions.updateCartItemAmount({ cartItem: { ...item, amount: 2 } }));
  });

  it("should remove the item from the cart", () => {
    const cartItem = <CartItem> { amount: 1, product: { id: "p" } };
    component.removeItemFromCart(cartItem);
    expect(store.dispatch).toHaveBeenCalledWith(OrderingStoreActions.removeItemFromCart({ cartItem }));
  });

  it("should remove all item from the cart", () => {
    component.removeAlltemFromCart();
    expect(store.dispatch).toHaveBeenCalledWith(OrderingStoreActions.removeAlltemFromCart());
  });

  it("should place order with an active status", () => {
    const mockDate = 1586012294;
    jasmine.clock().mockDate(new Date(mockDate));
    const orderItem = <OrderItem> { status: "preparing", amount: cartItems[0].amount, name: cartItems[0].product.name };
    const orderId = mockDate + selectedTable.name;
    const order = <Order> {
      id: orderId,
      items: [orderItem],
      status: "active",
      tableName: "table",
      timestamp: 1586012294,
    };

    component.placeOrder();

    expect(store.dispatch).toHaveBeenCalledWith(OrderingStoreActions.placeOrder({ order }));
  });
});
