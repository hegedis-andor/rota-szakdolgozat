import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateModule } from "@ngx-translate/core";
import { AppState, Order, Table } from "@rota/core/models";
import { OrderingStoreActions } from "../store";
import { TableSelectorComponent } from "./table-selector.component";

fdescribe("TableSelectorComponent", () => {
  let component: TableSelectorComponent;
  let fixture: ComponentFixture<TableSelectorComponent>;
  let store: MockStore<AppState>;
  const tables: Table[] = [<Table> { id: "01", name: "table1" }, <Table> { id: "02", name: "table2" }];
  const activeOrders: Order[] = [<Order> { status: "active", tableName: "table1" }];
  const initialState = <AppState> { restaurant: { tables, activeOrders }, ordering: {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableSelectorComponent],
      imports: [TranslateModule.forRoot()],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(TableSelectorComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set selected table to the store", () => {
    spyOn(store, "dispatch");
    const tableToSelect = tables[0];

    component.select(tableToSelect);

    expect(store.dispatch).toHaveBeenCalledWith(OrderingStoreActions.setSelectedTable({ table: tableToSelect }));
  });
});
