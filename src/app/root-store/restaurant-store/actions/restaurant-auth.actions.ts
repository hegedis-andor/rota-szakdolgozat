import { createAction, props } from "@ngrx/store";

export const saveRestaurantToLocalStorage = createAction(
  "[ROOT-RESTAURANT] Save Restaurant To Local Storage.",
  props<{ id: string; name: string }>()
);

export const loadRestaurantFromLocalStorage = createAction("[ROOT-RESTAURANT] Load Restaurant From Local Storage.");
export const removeRestaurant = createAction("[ROOT-RESTAURANT] Remove Restaurant From Store And Local Storage.");
export const removeSuccess = createAction("[ROOT-RESTAURANT] Remove Restaurant Success.");
export const signOut = createAction("[ROOT-RESTAURANT] Sign Out.");
