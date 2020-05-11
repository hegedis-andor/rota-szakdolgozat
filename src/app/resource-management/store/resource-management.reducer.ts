import { Action, createReducer, on } from "@ngrx/store";
import { ResourceManagementState } from "@rota/core/models/app-state";
import * as ResourceManagementStoreActions from "./resource-management.actions";
import { initialState } from "./resource-management.state";

const reducer = createReducer(
  initialState,
  on(ResourceManagementStoreActions.addTable, state => ({
    ...state,
    isLoading: true
  })),
  on(ResourceManagementStoreActions.addGroup, state => ({
    ...state,
    isLoading: true
  })),
  on(ResourceManagementStoreActions.addProduct, state => ({
    ...state,
    isLoading: true
  })),
  on(ResourceManagementStoreActions.setIsLoading, (state, { isLoading }) => ({
    ...state,
    isLoading
  })),
  on(ResourceManagementStoreActions.successResponse, state => ({
    ...state,
    isLoading: false
  })),
  on(ResourceManagementStoreActions.errorResponse, state => ({
    ...state,
    isLoading: false
  }))
);

export function resourceManagementReducer(state: ResourceManagementState | undefined, action: Action) {
  return reducer(state, action);
}
