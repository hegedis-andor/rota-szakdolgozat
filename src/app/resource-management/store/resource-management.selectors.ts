import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ResourceManagementState } from "@rota/core/models/app-state";

const selectResourceManagementState = createFeatureSelector<ResourceManagementState>("resourceManagement");

const getIsLoading = (state: ResourceManagementState) => state.isLoading;
export const selectIsLoading = createSelector(selectResourceManagementState, getIsLoading);
