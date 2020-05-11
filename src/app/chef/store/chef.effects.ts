import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { ChefService } from "../services/chef.service";
import * as ChefStoreActions from "./chef.actions";

@Injectable()
export class ChefStoreEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>, private chefService: ChefService) {}

  updateOrder$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ChefStoreActions.updateOrder),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.chefService.updateOrder(action.order, restaurantId).pipe(map(() => ChefStoreActions.setIsLoading({ isLoading: false })))
      )
    )
  );
}
