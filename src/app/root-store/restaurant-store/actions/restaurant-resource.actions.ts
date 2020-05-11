import { createAction, props } from "@ngrx/store";
import { Order } from "@rota/core/models";
import { Group } from "@rota/core/models/group";
import { Product } from "@rota/core/models/product";
import { Table } from "@rota/core/models/table";

export const loadResources = createAction("[ROOT-RESTAURANT] Load Resources.", props<{ restaurantId: string }>());
export const setRestaurant = createAction("[ROOT-RESTAURANT] Set Restaurant To Store.", props<{ id: string; name: string }>());
export const setTables = createAction("[ROOT-RESTAURANT] Set Tables.", props<{ tables: Table[] }>());
export const setGroups = createAction("[ROOT-RESTAURANT] Set Groups.", props<{ groups: Group[] }>());
export const setProducts = createAction("[ROOT-RESTAURANT] Set Products.", props<{ products: Product[] }>());
export const setActiveOrders = createAction("[ROOT-RESTAURANT] Set Active Orders.", props<{ activeOrders: Order[] }>());
export const setLoading = createAction(
  "[ROOT-RESTAURANT] Set Loading.",
  props<{ isLoading: { tables?: boolean; groups?: boolean; products?: boolean; activeOrders?: boolean } }>()
);
export const tablesSetSuccess = createAction("[ROOT-RESTAURANT] Tables Set Success.");
export const groupsSetSuccess = createAction("[ROOT-RESTAURANT] Groups Set Success.");
export const productsSetSuccess = createAction("[ROOT-RESTAURANT] Products Set Success.");
export const ordersSetSuccess = createAction("[ROOT-RESTAURANT] Order Set Success.");
export const loadResourcesSuccess = createAction("[ROOT-RESTAURANT] Load Resources Success.", props<{ navigateTo: string }>());

export const failedToLoadResource = createAction(
  "[ROOT-RESTAURANT] Failed To Load Resource.",
  props<{ failedResources: { tables?: boolean; groups?: boolean; products?: boolean; activeOrders?: boolean } }>()
);
