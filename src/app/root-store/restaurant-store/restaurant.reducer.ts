import { Action, createReducer, on } from "@ngrx/store";
import { RestaurantState } from "@rota/core/models/app-state";
import { set } from "lodash";
import { RestaurantStoreAuthActions, RestaurantStoreResourceActions, RestaurantStoreSettingActions } from "./actions";
import { initialState } from "./restaurant.state";

const reducer = createReducer(
  initialState,
  on(RestaurantStoreResourceActions.loadResources, (state) => ({
    ...state,
    isLoading: {
      tables: true,
      groups: true,
      products: true,
      activeOrders: true,
    },
    failedResources: {},
  })),
  on(RestaurantStoreResourceActions.setRestaurant, (state, { id, name }) => ({
    ...state,
    id,
    name,
  })),
  on(RestaurantStoreSettingActions.setRestaurantCurrency, (state, { currency }) => ({
    ...state,
    currency,
  })),
  on(RestaurantStoreSettingActions.setRestaurantLanguage, (state, { language }) => ({
    ...state,
    language,
  })),
  on(RestaurantStoreResourceActions.setTables, (state, { tables }) => ({
    ...state,
    tables,
    isLoading: {
      ...state.isLoading,
      tables: false,
    },
  })),
  on(RestaurantStoreResourceActions.setGroups, (state, { groups }) => ({
    ...state,
    groups,
    isLoading: {
      ...state.isLoading,
      groups: false,
    },
  })),
  on(RestaurantStoreResourceActions.setProducts, (state, { products }) => ({
    ...state,
    products,
    isLoading: {
      ...state.isLoading,
      products: false,
    },
  })),
  on(RestaurantStoreResourceActions.setActiveOrders, (state, { activeOrders }) => ({
    ...state,
    activeOrders,
    isLoading: {
      ...state.isLoading,
      activeOrders: false,
    },
  })),
  on(RestaurantStoreResourceActions.setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading: update(state.isLoading, isLoading),
  })),
  on(RestaurantStoreResourceActions.failedToLoadResource, (state, { failedResources }) => ({
    ...state,
    failedResources: update(state.failedResources, failedResources),
    isLoading: null,
  })),
  on(RestaurantStoreResourceActions.loadResourcesSuccess, (state) => ({
    ...state,
    areResourcesLoaded: true,
  })),
  on(RestaurantStoreAuthActions.removeRestaurant, () => ({
    ...initialState,
  }))
);

export function restaurantReducer(state: RestaurantState | undefined, action: Action) {
  return reducer(state, action);
}

function update(previous: { [key: string]: boolean }, current: { [key: string]: boolean }) {
  return current && previous ? set(previous, Object.keys(current)[0], Object.values(current)[0]) : null;
}
