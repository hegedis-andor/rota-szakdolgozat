import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { Product } from "@rota/core/models/product";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { ResourceManagementService } from "../services/resource-management.service";
import * as ResourceManagementStoreActions from "./resource-management.actions";

@Injectable()
export class ResourceManagementStoreEffects {
  constructor(private actions$: Actions, private resourceManagement: ResourceManagementService, private store$: Store<AppState>) {}

  addTable$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.addTable),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.resourceManagement.addTable(action.name, action.numberOfSeats, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: action.name })),
          catchError((error) => of(ResourceManagementStoreActions.errorResponse({ error: action.name })))
        )
      )
    )
  );

  editTable$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.editTable),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) => {
        return this.resourceManagement.editTable(action.table, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: action.table.name })),
          catchError((error) => of(ResourceManagementStoreActions.errorResponse({ error: action.table.name })))
        );
      })
    )
  );

  deleteTable$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.deleteTable),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.resourceManagement.deleteTable(action.id, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: "Table deleted" })),
          catchError((error) => of(ResourceManagementStoreActions.errorResponse({ error: "error" })))
        )
      )
    )
  );

  addGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.addGroup),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.resourceManagement.addGroup(action.group, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: action.group.name })),
          catchError((_error) => of(ResourceManagementStoreActions.errorResponse({ error: "error" })))
        )
      )
    )
  );

  editGroup: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.editGroup),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.resourceManagement.editGroup(action.group, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: action.group.name })),
          catchError((error) => of(ResourceManagementStoreActions.errorResponse({ error: action.group.name })))
        )
      )
    )
  );

  deleteGroup: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.deleteGroup),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.resourceManagement.deleteGroup(action.id, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: "Group Deleted" })),
          catchError((error) => of(ResourceManagementStoreActions.errorResponse({ error: "error" })))
        )
      )
    )
  );

  uploadImage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.addProduct),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.resourceManagement.uploadImage(action.image, restaurantId).pipe(
          map((imageUrl) => {
            const product: Product = {
              ...action.product,
              imageUrl,
              imagePath: `${restaurantId}/${action.image.name}`,
            };

            return ResourceManagementStoreActions.saveProduct({ product, restaurantId });
          }),
          catchError((error) => of(ResourceManagementStoreActions.errorResponse(error)))
        )
      )
    )
  );

  saveProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.saveProduct),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) => {
        return this.resourceManagement.addProduct(action.product, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: action.product.name })),
          catchError((error) => of(ResourceManagementStoreActions.errorResponse({ error: "error" })))
        );
      })
    )
  );

  editProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.editProduct),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) => {
        return this.resourceManagement.editProduct(action.product, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: action.product.name })),
          catchError((_error) => of(ResourceManagementStoreActions.errorResponse({ error: "error" })))
        );
      })
    )
  );

  deleteProduct: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.deleteProduct),
      withLatestFrom(this.store$.pipe(select(RestaurantStoreSelectors.selectId))),
      switchMap(([action, restaurantId]) =>
        this.resourceManagement.deleteProduct(action.id, restaurantId).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: "Product Deleted" })),
          catchError((_error) => of(ResourceManagementStoreActions.errorResponse({ error: "error" })))
        )
      )
    )
  );

  deleteProductImage: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceManagementStoreActions.deleteProduct),
      switchMap((action) =>
        this.resourceManagement.deleteImage(action.imageUrl).pipe(
          map(() => ResourceManagementStoreActions.successResponse({ successResponse: "Product Image Deleted" })),
          catchError((error) => of(ResourceManagementStoreActions.errorResponse({ error: "error" })))
        )
      )
    )
  );
}
