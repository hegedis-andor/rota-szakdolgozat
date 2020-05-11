import { Action, createReducer, on } from "@ngrx/store";
import { AuthState } from "@rota/core/models/app-state";
import * as AuthStoreActions from "./auth.actions";
import { initialState } from "./auth.state";

const reducer = createReducer(
  initialState,
  on(AuthStoreActions.setError, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),
  on(AuthStoreActions.setIsLoading, (state, { isLoading }) => ({
    ...state,
    isLoading
  })),
  on(AuthStoreActions.registerUser, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthStoreActions.loginUser, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthStoreActions.createRestaurant, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthStoreActions.joinUserToRestaurant, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthStoreActions.authSuccess, state => ({
    ...state,
    isLoading: false,
    error: null
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
