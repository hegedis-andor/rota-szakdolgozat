import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { Table } from "@rota/core/models/table";
import { sortByName } from "@rota/core/util";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { combineLatest, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { OrderingStoreActions, OrderingStoreSelectors } from "../store";

@Component({
  selector: "table-selector",
  templateUrl: "./table-selector.component.html",
  styleUrls: ["./table-selector.component.scss"]
})
export class TableSelectorComponent implements OnInit, OnDestroy {
  availableTables: Table[];
  occupiedTables: Table[];
  selectedTable$: Observable<Table>;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initTables();
    this.selectedTable$ = this.store.pipe(select(OrderingStoreSelectors.selectSelectedTable));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  select(table: Table): void {
    this.store.dispatch(OrderingStoreActions.setSelectedTable({ table }));
  }

  private initTables(): void {
    combineLatest([
      this.store.pipe(select(RestaurantStoreSelectors.selectTables)),
      this.store.pipe(select(RestaurantStoreSelectors.selectOccupiedTableNames))
    ])
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(([tables, occupiedTableNames]) => {
        this.availableTables = sortByName(tables.filter(table => !occupiedTableNames.includes(table.name)));
        this.occupiedTables = sortByName(tables.filter(table => occupiedTableNames.includes(table.name)));
      });
  }
}
