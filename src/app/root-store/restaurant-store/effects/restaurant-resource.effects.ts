import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models";
import { RestaurantService } from "@rota/core/services/restaurant.service";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { RestaurantStoreResourceActions } from "../actions";

@Injectable()
export class RestaurnatStoreResourceEffects {
  constructor(
    private actions$: Actions,
    private restaurantService: RestaurantService,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  loadTables$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreResourceActions.loadResources),
      switchMap((action) =>
        this.restaurantService.getTables(action.restaurantId).pipe(
          map((tables) => RestaurantStoreResourceActions.setTables({ tables })),
          catchError(() => of(RestaurantStoreResourceActions.failedToLoadResource({ failedResources: { tables: true } })))
        )
      )
    )
  );

  loadGroups$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreResourceActions.loadResources),
      switchMap((action) =>
        this.restaurantService.getGroups(action.restaurantId).pipe(
          map((groups) => RestaurantStoreResourceActions.setGroups({ groups })),
          catchError(() => of(RestaurantStoreResourceActions.failedToLoadResource({ failedResources: { groups: true } })))
        )
      )
    )
  );

  loadProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreResourceActions.loadResources),
      switchMap((action) =>
        this.restaurantService.getProducts(action.restaurantId).pipe(
          map((products) => RestaurantStoreResourceActions.setProducts({ products })),
          catchError(() => of(RestaurantStoreResourceActions.failedToLoadResource({ failedResources: { products: true } })))
        )
      )
    )
  );

  loadActiveOrders$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreResourceActions.loadResources),
      switchMap((action) =>
        this.restaurantService.getOrdersByStatus("active", action.restaurantId).pipe(
          map((activeOrders) => RestaurantStoreResourceActions.setActiveOrders({ activeOrders })),
          catchError(() => of(RestaurantStoreResourceActions.failedToLoadResource({ failedResources: { activeOrders: true } })))
        )
      )
    )
  );

  loadResourcesSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreResourceActions.loadResourcesSuccess),
      tap((action) => this.router.navigateByUrl(action.navigateTo)),
      map(() => RestaurantStoreResourceActions.setLoading({ isLoading: null }))
    )
  );
}
