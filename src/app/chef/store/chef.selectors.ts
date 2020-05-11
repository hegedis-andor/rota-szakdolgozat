import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChefState } from "@rota/core/models/app-state";

const selectChefState = createFeatureSelector<ChefState>("chef");

export const selectIsLoading = createSelector(selectChefState, (state: ChefState) => state.isLoading);
