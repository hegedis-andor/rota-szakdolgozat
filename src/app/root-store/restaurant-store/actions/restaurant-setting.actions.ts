import { createAction, props } from "@ngrx/store";

export const saveRestaurantLanguage = createAction("[ROOT-RESTAURANT] Save Restaurant Language.", props<{ language: string }>());
export const saveRestaurantCurrency = createAction("[ROOT-RESTAURANT] Save Restaurant Currency.", props<{ currency: string }>());
export const setRestaurantCurrency = createAction("[ROOT-RESTAURANT] Set Restaurant Currency To Store.", props<{ currency: string }>());
export const setRestaurantLanguage = createAction("[ROOT-RESTAURANT] Set Restaurant Language To Store.", props<{ language: string }>());
export const loadRestaurantSettings = createAction("[ROOT-RESTAURANT] Load Restaurant Settings.", props<{ restaurantId: string }>());
export const saveSuccess = createAction("[ROOT-RESTAURANT] Restaurant Settings Save Success.");
export const failedToLoadSettings = createAction("[ROOT-RESTAURANT] Restaurant Settings failedToLoad.");
