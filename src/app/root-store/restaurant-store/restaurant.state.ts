import { RestaurantState } from "@rota/core/models/app-state";

export const initialState: RestaurantState = {
  id: null,
  name: null,
  language: null,
  currency: null,
  tables: null,
  groups: null,
  products: null,
  activeOrders: null,
  isLoading: null,
  failedResources: null,
  areResourcesLoaded: false
};
