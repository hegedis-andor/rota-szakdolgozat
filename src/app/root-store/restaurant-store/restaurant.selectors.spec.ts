import { Group, Order, Product, RestaurantState, Table } from "@rota/core/models";
import {
  selectGroupById,
  selectOccupiedTableNames,
  selectProductById,
  selectProducts,
  selectRestaurant,
  selectTableById,
} from "./restaurant.selectors";

fdescribe("Restaurant selectors", () => {
  const prod1 = <Product> { name: "food", groupName: "asd", subgroup: { name: "asd" } };
  const prod2 = <Product> { name: "qwe", groupName: "food", subgroup: { name: "qwe" } };
  const prod3 = <Product> { name: "rtz", groupName: "rtz", subgroup: { name: "food" } };
  const prod4 = <Product> { id: "p-id01", name: "drink", groupName: "drink", subgroup: { name: "sodas" } };
  const activeOrders: Order[] = [<Order> { id: "o-id01", status: "active", tableName: "t1" }];
  const tables: Table[] = [<Table> { id: "t1" }, <Table> { id: "t2" }];
  const groups: Group[] = [<Group> { id: "g-id01" }, <Group> { id: "g-id02" }];
  const id = "r-id";
  const name = "r-name";

  const state = <RestaurantState> { products: [prod1, prod2, prod3, prod4], tables, activeOrders, groups, id, name };

  it("should select products which groupname or subgroup name contains filterCriteria", () => {
    const props = { filterCriteria: "food" };
    expect(selectProducts.projector(state, props)).toEqual([prod2, prod3]);
  });

  it("should return all the products if filterCriteria is All", () => {
    const props = { filterCriteria: "All" };
    expect(selectProducts.projector(state, props)).toEqual([prod1, prod2, prod3, prod4]);
  });

  it("should select occupied table names", () => {
    expect(selectOccupiedTableNames.projector(state)).toEqual([activeOrders[0].tableName]);
  });

  it("should select table matched by id from props", () => {
    const props = { id: "t2" };
    expect(selectTableById.projector(state, props)).toEqual(tables[1]);
  });

  it("should select group matched by id from props", () => {
    const props = { id: "g-id02" };
    expect(selectGroupById.projector(state, props)).toEqual(groups[1]);
  });

  it("should select product matched by id from props", () => {
    const props = { id: "p-id01" };
    expect(selectProductById.projector(state, props)).toEqual(prod4);
  });

  it("should return restauran id and name in an object", () => {
    expect(selectRestaurant.projector(state)).toEqual({ restaurantId: id, restaurantName: name });
  });
});
