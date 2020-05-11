import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Cart, CartItem, Order, OrderItem } from "@rota/core/models";
import { AppState } from "@rota/core/models/app-state";
import { Table } from "@rota/core/models/table";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { combineLatest, Observable, Subject } from "rxjs";
import { first, map, takeUntil } from "rxjs/operators";
import { OrderingStoreActions, OrderingStoreSelectors } from "../store";

@Component({
  selector: "rota-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  selectedTable$: Observable<Table>;
  totalAmount$: Observable<number>;
  currency: string;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.cart$ = this.store$.pipe(select(OrderingStoreSelectors.selectCart));
    this.selectedTable$ = this.store$.pipe(select(OrderingStoreSelectors.selectSelectedTable));
    this.initCurrency();
    this.initTotalAmount();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  updateAmount(amount: number, item: CartItem): void {
    this.store$.dispatch(OrderingStoreActions.updateCartItemAmount({ cartItem: { amount, product: item.product } }));
  }

  removeItemFromCart(item: CartItem): void {
    this.store$.dispatch(OrderingStoreActions.removeItemFromCart({ cartItem: item }));
  }

  removeAlltemFromCart(): void {
    this.store$.dispatch(OrderingStoreActions.removeAlltemFromCart());
  }

  placeOrder(): void {
    combineLatest([this.cart$, this.selectedTable$])
      .pipe(first())
      .subscribe(([cart, table]) => this.store$.dispatch(OrderingStoreActions.placeOrder({ order: convertToOrder(cart, table) })));
  }

  private initCurrency(): void {
    this.store$
      .pipe(select(RestaurantStoreSelectors.selectCurrency), takeUntil(this.ngUnsubscribe$))
      .subscribe(currency => (this.currency = currency));
  }

  private initTotalAmount(): void {
    this.totalAmount$ = this.cart$.pipe(
      map(cart => {
        if (cart.items.length === 0) {
          return 0;
        }

        return cart.items.map(item => item.product.price * item.amount).reduce((total, curr) => total + curr);
      })
    );
  }
}

function convertToOrder(cart: Cart, table: Table): Order {
  const timestamp = Date.now();
  const order: Order = {
    id: generateId(timestamp, table.name),
    timestamp,
    items: convertToOrderItems(cart.items),
    status: "active",
    tableName: table.name
  };
  return order;
}

function generateId(timestamp: number, tableName: string): string {
  return timestamp.toString() + tableName.replace(/[^a-zA-Z0-9_]+/g, "");
}

function convertToOrderItems(cartItems: CartItem[]): OrderItem[] {
  return cartItems.map(item => {
    return {
      amount: item.amount,
      name: item.product.name,
      status: "preparing"
    };
  });
}
