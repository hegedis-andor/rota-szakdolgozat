import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { SnackbarService } from "@rota/shared/snackbar/services";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as ResourceManagementStoreActions from "./resource-management.actions";

@Injectable()
export class ResourceManagementUtilsStoreEffects {
  constructor(private actions$: Actions, private snackbarService: SnackbarService) {}

  showSuccessSnackbar: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ResourceManagementStoreActions.successResponse),
        tap(action => this.snackbarService.openDefaultSuccessSnackbar(action.successResponse))
      ),
    { dispatch: false }
  );

  showErrorSnackbar: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ResourceManagementStoreActions.errorResponse),
        tap(action => this.snackbarService.openDefaultErrorSnackbar(action.error))
      ),
    { dispatch: false }
  );
}
