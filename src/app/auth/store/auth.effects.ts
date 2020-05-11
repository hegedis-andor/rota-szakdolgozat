import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { RestaurantStoreAuthActions } from "@rota/root-store/restaurant-store";
import { Observable, of, pipe } from "rxjs";
import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import * as AuthStoreActions from "./auth.actions";

interface RestaurantAuthResponse {
  status: string;
  data: {
    restaurant: {
      restaurantId: string;
      restaurantName: string;
    };
  };
}

const handleUserAuth = pipe(
  map(() => AuthStoreActions.authSuccess({ navigateTo: "authentication/restaurant" })),
  catchError((error) => of(AuthStoreActions.setError({ error })))
);

const handleRestaurantAuth = pipe(
  concatMap((response: RestaurantAuthResponse) => {
    return [
      RestaurantStoreAuthActions.saveRestaurantToLocalStorage({
        id: response.data.restaurant.restaurantId,
        name: response.data.restaurant.restaurantName,
      }),
      AuthStoreActions.authSuccess({ navigateTo: "loading-resources" }),
    ];
  }),
  catchError((error) => of(AuthStoreActions.setError({ error: error.error })))
);

@Injectable()
export class AuthStoreEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  registerUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStoreActions.registerUser),
      switchMap((action) => this.authService.registerWithEmailAndPassword(action.userCredentials).pipe(handleUserAuth))
    )
  );

  loginUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStoreActions.loginUser),
      switchMap((action) => this.authService.loginWithEmailAndPassword(action.userCredentials).pipe(handleUserAuth))
    )
  );

  createRestaurant$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStoreActions.createRestaurant),
      switchMap((action) => this.authService.createRestaurant(action.restaurantCredentials).pipe(handleRestaurantAuth))
    )
  );

  joinUserToRestaurant$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStoreActions.joinUserToRestaurant),
      switchMap((action) => this.authService.joinRestaurant(action.restaurantCredentials).pipe(handleRestaurantAuth))
    )
  );

  authorizationSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStoreActions.authSuccess),
      tap((action) => this.router.navigate([action.navigateTo])),
      map(() => AuthStoreActions.setIsLoading({ isLoading: false }))
    )
  );
}
