import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Table } from "@rota/core/models";
import { AppState } from "@rota/core/models/app-state";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { ResourceManagementStoreActions, ResourceManagementStoreSelectores } from "../store";

@Component({
  selector: "rota-table-editor",
  templateUrl: "./table-editor.component.html",
  styleUrls: ["./table-editor.component.scss"]
})
export class TableEditorComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  tableToEdit?: Table;
  form: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.formInitializer();
    this.isLoading$ = this.store.pipe(select(ResourceManagementStoreSelectores.selectIsLoading));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  saveTable(): void {
    if (this.tableToEdit) {
      this.store.dispatch(ResourceManagementStoreActions.editTable({ table: { ...this.table, id: this.tableToEdit.id } }));
    } else {
      this.store.dispatch(ResourceManagementStoreActions.addTable({ ...this.table }));
    }
  }
  private formInitializer(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get("id")),
        switchMap(id => this.store.pipe(select(RestaurantStoreSelectors.selectTableById, { id }))),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(table => {
        if (!table) {
          this.form = this.initForm();
          return;
        }

        this.form = this.initForm(table);
        this.tableToEdit = table;
      });
  }

  private initForm(table?: Table): FormGroup {
    return new FormGroup({
      tableName: new FormControl(table ? table.name : "", Validators.required),
      numberOfSeats: new FormControl(table ? table.numberOfSeats : "", [Validators.required, Validators.pattern("[1-9]+[0-9]?")])
    });
  }

  private get table(): { name: string; numberOfSeats: number } {
    return {
      name: this.form.controls.tableName.value,
      numberOfSeats: +this.form.controls.numberOfSeats.value
    };
  }
}
