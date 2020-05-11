import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "@rota/core/models/app-state";

const getError = (state: AuthState) => state.error;
const getIsLoading = (state: AuthState) => state.isLoading;

const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectError = createSelector(selectAuthState, getError);
export const selectIsLoading = createSelector(selectAuthState, getIsLoading);
