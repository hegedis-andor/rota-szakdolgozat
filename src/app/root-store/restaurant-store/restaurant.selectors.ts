import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RestaurantState } from "@rota/core/models/app-state";

const selectRestaurantState = createFeatureSelector<RestaurantState>("restaurant");

export const selectId = createSelector(selectRestaurantState, (state: RestaurantState) => state.id);
export const selectName = createSelector(selectRestaurantState, (state: RestaurantState) => state.name);
export const selectTables = createSelector(selectRestaurantState, (state: RestaurantState) => state.tables);
export const selectGroups = createSelector(selectRestaurantState, (state: RestaurantState) => state.groups);
export const selectActiveOrders = createSelector(selectRestaurantState, (state: RestaurantState) => state.activeOrders);
export const selectIsLoading = createSelector(selectRestaurantState, (state: RestaurantState) => state.isLoading);
export const selectFailedResources = createSelector(selectRestaurantState, (state: RestaurantState) => state.failedResources);
export const selectAreResourcesLoaded = createSelector(selectRestaurantState, (state: RestaurantState) => state.areResourcesLoaded);
export const selectLanguage = createSelector(selectRestaurantState, (state: RestaurantState) => state.language);
export const selectCurrency = createSelector(selectRestaurantState, (state: RestaurantState) => state.currency);
export const selectAllProducts = createSelector(selectRestaurantState, (state: RestaurantState) => state.products);

export const selectProducts = createSelector(selectRestaurantState, (state: RestaurantState, props) => {
  if (props.filterCriteria === "All") {
    return state.products;
  }

  return state.products.filter(
    (product) =>
      product.subgroup.name.toLocaleLowerCase().includes(props.filterCriteria.toLocaleLowerCase()) ||
      product.groupName.toLocaleLowerCase().includes(props.filterCriteria.toLocaleLowerCase())
  );
});

export const selectOccupiedTableNames = createSelector(selectRestaurantState, (state: RestaurantState) =>
  state.activeOrders.map((orders) => orders.tableName)
);

export const selectTableById = createSelector(selectRestaurantState, (state: RestaurantState, props) =>
  state.tables.find((table) => table.id === props.id)
);

export const selectGroupById = createSelector(selectRestaurantState, (state: RestaurantState, props) =>
  state.groups.find((groups) => groups.id === props.id)
);

export const selectProductById = createSelector(selectRestaurantState, (state: RestaurantState, props) =>
  state.products.find((product) => product.id === props.id)
);

export const selectRestaurant = createSelector(selectRestaurantState, (state: RestaurantState) => {
  return { restaurantId: state.id, restaurantName: state.name };
});
