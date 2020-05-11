import { createAction, props } from "@ngrx/store";
import { RestaurantCredentials } from "../models/restaurant-credentials.model";
import { UserCredentials } from "../models/user-credentials.model";

export const registerUser = createAction("[AUTH] Register User.", props<{ userCredentials: UserCredentials }>());

export const loginUser = createAction("[AUTH] Login User.", props<{ userCredentials: UserCredentials }>());

export const authSuccess = createAction("[AUTH] Authorization Success.", props<{ navigateTo: string }>());

export const createRestaurant = createAction("[AUTH] Create Restaurant.", props<{ restaurantCredentials: RestaurantCredentials }>());

export const joinUserToRestaurant = createAction(
  "[AUTH] Join User To Restaurant.",
  props<{ restaurantCredentials: RestaurantCredentials }>()
);

export const setError = createAction("[AUTH] Set Error.", props<{ error: any }>());

export const setIsLoading = createAction("[AUTH] Set Loading.", props<{ isLoading: boolean }>());
