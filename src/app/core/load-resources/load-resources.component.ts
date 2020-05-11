import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { RestaurantStoreAuthActions, RestaurantStoreResourceActions, RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { RestaurantStoreSettingActions } from "@rota/root-store/restaurant-store/actions";
import { combineLatest, Observable, Subject } from "rxjs";
import { filter, map, switchMap, takeUntil } from "rxjs/operators";
import { AppState } from "../models/app-state";

@Component({
  selector: "rota-load-resources",
  templateUrl: "./load-resources.component.html",
  styleUrls: ["./load-resources.component.scss"],
})
export class LoadResourcesComponent implements OnInit, OnDestroy {
  isLoading$: Observable<{ tables?: boolean; groups?: boolean; products?: boolean }>;
  failedResources$: Observable<{ tables?: boolean; groups?: boolean; products?: boolean }>;
  restaurantId$: Observable<string>;
  redirectUrl$: Observable<string>;
  objectKeys = Object.keys;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.restaurantId$ = this.store.pipe(select(RestaurantStoreSelectors.selectId));
    this.isLoading$ = this.store.pipe(select(RestaurantStoreSelectors.selectIsLoading));
    this.failedResources$ = this.store.pipe(select(RestaurantStoreSelectors.selectFailedResources));
    this.loadResourcesAndSettings();
    this.setSuccessOnFinishedLoading();
    this.initRedirectUrl();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  tryAgain(): void {
    this.loadResourcesAndSettings();
  }

  signOut(): void {
    this.store.dispatch(RestaurantStoreAuthActions.signOut());
  }

  private initRedirectUrl() {
    this.redirectUrl$ = this.route.queryParamMap.pipe(map((params) => params.get("redirectUrl")));
  }

  private setSuccessOnFinishedLoading(): void {
    combineLatest([this.isLoading$, this.failedResources$])
      .pipe(
        filter(([isLoading, failedResources]) => (hasTrueField(failedResources) || hasTrueField(isLoading) ? false : true)),
        switchMap(() => this.redirectUrl$),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((redirectUrl) => {
        if (!redirectUrl) {
          redirectUrl = "/admin/account";
        }
        this.store.dispatch(RestaurantStoreResourceActions.loadResourcesSuccess({ navigateTo: redirectUrl }));
      });
  }

  private loadResourcesAndSettings(): void {
    this.restaurantId$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((restaurantId) => {
      this.store.dispatch(RestaurantStoreResourceActions.loadResources({ restaurantId })),
        this.store.dispatch(RestaurantStoreSettingActions.loadRestaurantSettings({ restaurantId }));
    });
  }
}

function hasTrueField(object: { [key: string]: boolean }): boolean {
  return object ? Object.values(object).find((value) => value === true) : false;
}
