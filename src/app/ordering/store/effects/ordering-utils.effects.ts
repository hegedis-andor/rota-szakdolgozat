import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { SnackbarService } from "@rota/shared/snackbar/services";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { OrderingStoreActions } from "..";

@Injectable()
export class OrderingStoreUtilsEffects {
  constructor(private actions$: Actions, private snackbarService: SnackbarService) {}

  openSuccessSnackbar$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderingStoreActions.openSuccessSnackbar),
        tap((action) => this.snackbarService.openDefaultSuccessSnackbar(action.text))
      ),
    { dispatch: false }
  );

  openErrorSnackbar$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderingStoreActions.openErrorSnackbar),
        tap((action) => this.snackbarService.openDefaultErrorSnackbar(action.text))
      ),
    { dispatch: false }
  );
}
