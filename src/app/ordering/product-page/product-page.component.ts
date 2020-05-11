import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { CartItem } from "@rota/core/models/cart";
import { Product } from "@rota/core/models/product";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable, Subject } from "rxjs";
import { filter, map, switchMap, takeUntil } from "rxjs/operators";
import { OrderingStoreActions } from "../store";

@Component({
  selector: "rota-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product$: Observable<Product>;
  selectedAmount = 1;
  currency: string;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.initProduct();
    this.initCurrency();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      product,
      amount: this.selectedAmount
    };

    this.store$.dispatch(OrderingStoreActions.addToCart({ cartItem }));
  }

  convertToNAIfEmpty(input: string): string {
    if (!input) {
      return "N/A";
    }

    return input;
  }

  private initCurrency(): void {
    this.store$
      .pipe(select(RestaurantStoreSelectors.selectCurrency), takeUntil(this.ngUnsubscribe$))
      .subscribe(currency => (this.currency = currency));
  }

  private initProduct(): void {
    this.product$ = this.route.paramMap.pipe(
      map(params => params.get("id")),
      filter(productId => !!productId),
      switchMap(productId => this.store$.pipe(select(RestaurantStoreSelectors.selectProductById, { id: productId })))
    );
  }
}
