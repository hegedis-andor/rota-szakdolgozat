import { createAction, props } from "@ngrx/store";
import { Order } from "@rota/core/models";

export const updateOrder = createAction("[Chef] Update Order.", props<{ order: Order }>());
export const setIsLoading = createAction("[Chef] Set Loading.", props<{ isLoading: boolean }>());
