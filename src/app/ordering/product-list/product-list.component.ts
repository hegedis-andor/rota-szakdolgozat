import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { Product } from "@rota/core/models/product";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "rota-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  currency: string;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private store$: Store<AppState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.filterProducts();
    this.initCurrency();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  openProdcutPage(product: Product): void {
    this.router.navigate(["ordering/product", product.id]);
  }

  private initCurrency(): void {
    this.store$
      .pipe(select(RestaurantStoreSelectors.selectCurrency), takeUntil(this.ngUnsubscribe$))
      .subscribe(currency => (this.currency = currency));
  }

  private filterProducts(): void {
    this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(paramMap => {
      const filterCriteria = paramMap.get("filterCriteria");
      this.products$ = this.store$.pipe(select(RestaurantStoreSelectors.selectProducts, { filterCriteria }));
    });
  }
}
