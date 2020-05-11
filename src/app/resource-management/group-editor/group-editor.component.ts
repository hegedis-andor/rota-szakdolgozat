import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Group, Subgroup } from "@rota/core/models";
import { AppState } from "@rota/core/models/app-state";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { ResourceManagementStoreActions, ResourceManagementStoreSelectores } from "../store";

@Component({
  selector: "rota-group-editor",
  templateUrl: "./group-editor.component.html",
  styleUrls: ["./group-editor.component.scss"],
})
export class GroupEditorComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  groupToEdit: Group;
  form: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit() {
    this.formInitializer();
    this.isLoading$ = this.store.pipe(select(ResourceManagementStoreSelectores.selectIsLoading));
  }

  saveGroup(): void {
    if (this.groupToEdit) {
      this.store.dispatch(ResourceManagementStoreActions.editGroup({ group: { id: this.groupToEdit.id, ...this.group } }));
    } else {
      this.store.dispatch(ResourceManagementStoreActions.addGroup({ group: this.group }));
    }
  }

  addExtraSubgroup() {
    const subgroupFormArray = <FormArray> this.form.get("subgroups");
    subgroupFormArray.push(this.createSubgroupFormGroup());
  }

  removeSubgroup(index: number) {
    if (index === 0) {
      return;
    }
    const subgroupFormArray = <FormArray> this.form.get("subgroups");
    subgroupFormArray.removeAt(index);
  }

  get subgroupControlls(): AbstractControl[] {
    return (<FormArray> this.form.get("subgroups")).controls;
  }

  private formInitializer(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get("id")),
        switchMap((id) => this.store.pipe(select(RestaurantStoreSelectors.selectGroupById, { id }))),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((group) => {
        if (!group) {
          this.form = this.initForm();
          return;
        }

        this.form = this.initForm(group);
        this.groupToEdit = group;
      });
  }

  private initForm(group?: Group): FormGroup {
    const subgroupsFormArray = new FormArray([]);
    if (group) {
      group.subgroups.forEach((subgroup) => subgroupsFormArray.push(this.createSubgroupFormGroup(subgroup)));
    } else {
      subgroupsFormArray.push(this.createSubgroupFormGroup());
    }

    return new FormGroup({
      groupName: new FormControl(group ? group.name : "", Validators.required),
      subgroups: subgroupsFormArray,
    });
  }

  private createSubgroupFormGroup(subgroup?: Subgroup): FormGroup {
    return subgroup
      ? new FormGroup({
          id: new FormControl(subgroup.id),
          name: new FormControl(subgroup.name),
        })
      : new FormGroup({
          id: new FormControl(this.afs.createId()),
          name: new FormControl(""),
        });
  }

  private get group(): Group {
    const subgroups = this.form.controls.subgroups.value.filter((subgroup) => subgroup.name !== "");

    return {
      name: this.form.controls.groupName.value,
      subgroups,
    };
  }
}
