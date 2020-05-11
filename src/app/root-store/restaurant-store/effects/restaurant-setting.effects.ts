import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { RestaurantService } from "@rota/core/services/restaurant.service";
import { EMPTY, merge, Observable } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { RestaurantStoreSelectors } from "..";
import { RestaurantStoreSettingActions } from "../actions";

@Injectable()
export class RestaurnatStoreSettingEffects {
  constructor(private actions$: Actions, private restaurantService: RestaurantService, private store$: Store<AppState>) {}

  saveRestaurantLanguage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreSettingActions.saveRestaurantLanguage),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurnatId]) =>
        this.restaurantService.saveLanguage(action.language, restaurnatId).pipe(
          map(() => RestaurantStoreSettingActions.saveSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  saveRestaurantCurrency: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreSettingActions.saveRestaurantCurrency),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurnatId]) =>
        this.restaurantService.saveCurrency(action.currency, restaurnatId).pipe(
          map(() => RestaurantStoreSettingActions.saveSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadSettings: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreSettingActions.loadRestaurantSettings),
      switchMap((action) => {
        return this.restaurantService.getSettings(action.restaurantId).pipe(
          switchMap((settings: { currency: string; language: string }) =>
            merge([
              RestaurantStoreSettingActions.setRestaurantCurrency({ currency: settings.currency }),
              RestaurantStoreSettingActions.setRestaurantLanguage({ language: settings.language }),
            ])
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );
}
