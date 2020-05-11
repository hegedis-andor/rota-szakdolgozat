import { createAction, props } from "@ngrx/store";
import { Group, Table } from "@rota/core/models";
import { Product } from "@rota/core/models/product";

export const addTable = createAction("[RESOURCE-MANAGEMENT] Add Table.", props<{ name: string; numberOfSeats: number }>());
export const editTable = createAction("[RESOURCE-MANAGEMENT] Edit Table.", props<{ table: Table }>());
export const deleteTable = createAction("[RESOURCE-MANAGEMENT] Delete Table.", props<{ id: string }>());

export const addGroup = createAction("[RESOURCE-MANAGEMENT] Add Group.", props<{ group: Group }>());
export const editGroup = createAction("[RESOURCE-MANAGEMENT] Edit Group.", props<{ group: Group }>());
export const deleteGroup = createAction("[RESOURCE-MANAGEMENT] Delete Group.", props<{ id: string }>());

export const addProduct = createAction(
  "[RESOURCE-MANAGEMENT] Add Product, Start With Uploading Image.",
  props<{ product: Product; image: File }>()
);
export const saveProduct = createAction("[RESOURCE-MANAGEMENT] Add Product.", props<{ product: Product; restaurantId: string }>());
export const editProduct = createAction("[RESOURCE-MANAGEMENT] Edit Product.", props<{ product: Product }>());
export const deleteProduct = createAction("[RESOURCE-MANAGEMENT] Delete Product.", props<{ id: string; imageUrl: string }>());

export const successResponse = createAction("[RESOURCE-MANAGEMENT] Successfully executed.", props<{ successResponse: string }>());
export const errorResponse = createAction("[RESOURCE-MANAGEMENT] Error Executing API.", props<{ error: string }>());

export const setIsLoading = createAction("[RESOURCE-MANAGEMENT] Set Loading.", props<{ isLoading: boolean }>());
