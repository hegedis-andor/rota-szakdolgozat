import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Group, Product, Table } from "@rota/core/models";
import { AppState } from "@rota/core/models/app-state";
import { sortByName } from "@rota/core/util";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { ConfirmationDialogComponent, DialogConfig, DialogService } from "@rota/shared/dialog";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResourceManagementStoreActions } from "../store";

const actions = {
  actions: {
    confrim: "RESOURCE_MANAGEMENT.MODIFY.DIALOG_ACTION_YES",
    cancel: "RESOURCE_MANAGEMENT.MODIFY.DIALOG_ACTION_CANCEL",
    danger: true,
  },
};

@Component({
  selector: "rota-modify",
  templateUrl: "./modify.component.html",
  styleUrls: ["./modify.component.scss"],
})
export class ModifyComponent implements OnInit {
  tables$: Observable<Table[]>;
  groups$: Observable<Group[]>;
  products$: Observable<Product[]>;

  constructor(private store$: Store<AppState>, private dialogService: DialogService, private router: Router) {}

  ngOnInit() {
    this.tables$ = this.store$.pipe(select(RestaurantStoreSelectors.selectTables), map(sortByName));
    this.groups$ = this.store$.pipe(select(RestaurantStoreSelectors.selectGroups), map(sortByName));
    this.products$ = this.store$.pipe(select(RestaurantStoreSelectors.selectAllProducts), map(sortByName));
  }

  deleteTable(table: Table): void {
    const config: DialogConfig = {
      backdropClass: "dialog-backdrop-light",
      data: {
        title: "RESOURCE_MANAGEMENT.MODIFY.DIALOG_TITLE_TABLE_DELETION",
        text: table.name,
        ...actions,
      },
    };

    this.askConfirmation(config).subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }
      this.store$.dispatch(ResourceManagementStoreActions.deleteTable({ id: table.id }));
    });
  }

  deleteGroup(group: Group): void {
    const config: DialogConfig = {
      backdropClass: "dialog-backdrop-light",
      data: {
        title: "RESOURCE_MANAGEMENT.MODIFY.DIALOG_TITLE_GROUP_DELETION",
        text: group.name,
        ...actions,
      },
    };

    this.askConfirmation(config).subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }
      this.store$.dispatch(ResourceManagementStoreActions.deleteGroup({ id: group.id }));
    });
  }

  deleteProduct(product: Product): void {
    const config: DialogConfig = {
      backdropClass: "dialog-backdrop-light",
      data: {
        title: "RESOURCE_MANAGEMENT.MODIFY.DIALOG_TITLE_PRODUCT_DELETION",
        text: product.name,
        ...actions,
      },
    };

    this.askConfirmation(config).subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }
      this.store$.dispatch(ResourceManagementStoreActions.deleteProduct({ id: product.id, imageUrl: product.imageUrl }));
    });
  }

  editTable(table: Table): void {
    this.router.navigate(["resource-management/table-editor", { id: table.id }]);
  }

  editGroup(group: Group): void {
    this.router.navigate(["resource-management/group-editor", { id: group.id }]);
  }

  editProduct(product: Product): void {
    this.router.navigate(["resource-management/product-editor", { id: product.id }]);
  }

  joinSubgroups(group: Group): string[] {
    return group.subgroups.map((subgroup) => subgroup.name);
  }

  askConfirmation(config: DialogConfig): Observable<boolean> {
    return this.dialogService.openDialog<ConfirmationDialogComponent, boolean>(ConfirmationDialogComponent, config).afterClosed();
  }
}
