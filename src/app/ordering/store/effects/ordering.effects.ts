import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable, of } from "rxjs";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";
import { OrderingStoreActions } from "..";
import { OrderingService } from "../../services";

@Injectable()
export class OrderingStoreEffects {
  constructor(private actions$: Actions, private orderingService: OrderingService, private store$: Store<AppState>) {}

  addToCart$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderingStoreActions.addToCart),
      map(() => OrderingStoreActions.openSuccessSnackbar({ text: "ORDERING.PRODUCT_PAGE.SNACKBAR_SUCCESS_TEXT" }))
    )
  );

  placeOrder$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderingStoreActions.placeOrder),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.orderingService.placeOrder(action.order, restaurantId).pipe(
          concatMap(() => [
            OrderingStoreActions.openSuccessSnackbar({ text: "ORDERING.CHECKOUT.SNACKBAR_SUCCESS_TEXT" }),
            OrderingStoreActions.orderSuccessfullyPlaced(),
          ]),
          catchError(() => of(OrderingStoreActions.openErrorSnackbar({ text: "ORDERING.CHECKOUT.SNACKBAR_FAIL_TEXT" })))
        )
      )
    )
  );
}
