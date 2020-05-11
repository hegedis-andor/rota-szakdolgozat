import { Action, createReducer, on } from "@ngrx/store";
import { ChefState } from "@rota/core/models/app-state";
import * as ChefStoreActions from "./chef.actions";
import { initialState } from "./chef.state";

const reducer = createReducer(
  initialState,
  on(ChefStoreActions.updateOrder, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ChefStoreActions.setIsLoading, (state, isLoading) => ({
    ...state,
    ...isLoading,
  }))
);

export function chefReducer(state: ChefState | undefined, action: Action) {
  return reducer(state, action);
}
