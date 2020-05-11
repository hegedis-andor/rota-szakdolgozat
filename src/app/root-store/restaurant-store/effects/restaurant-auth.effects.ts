import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { RestaurantStoreAuthActions, RestaurantStoreResourceActions } from "../actions";

@Injectable()
export class RestaurnatStoreAuthEffects {
  constructor(private actions$: Actions, private localStorage: Storage, private afAuth: AngularFireAuth, private router: Router) {}

  saveRestaurantToLocalStorage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreAuthActions.saveRestaurantToLocalStorage),
      switchMap(action => {
        return from(this.localStorage.set("restaurant", { id: action.id, name: action.name })).pipe(
          map(() => RestaurantStoreResourceActions.setRestaurant({ id: action.id, name: action.name }))
        );
      })
    )
  );

  loadRestaurantFromLocalStorage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreAuthActions.loadRestaurantFromLocalStorage),
      switchMap(() => {
        return from(this.localStorage.get("restaurant")).pipe(
          map((restaurant: { id: string; name: string }) => RestaurantStoreResourceActions.setRestaurant(restaurant))
        );
      })
    )
  );

  signOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreAuthActions.signOut),
      switchMap(() => this.afAuth.auth.signOut()),
      map(() => RestaurantStoreAuthActions.removeRestaurant())
    )
  );

  removeRestaurantFromLocalStorage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreAuthActions.removeRestaurant),
      switchMap(() => from(this.localStorage.remove("restaurant")).pipe(map(() => RestaurantStoreAuthActions.removeSuccess())))
    )
  );

  restaurantRemoveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantStoreAuthActions.removeSuccess),
      tap(() => this.router.navigateByUrl("/")),
      map(() => RestaurantStoreResourceActions.setLoading({ isLoading: {} }))
    )
  );
}
