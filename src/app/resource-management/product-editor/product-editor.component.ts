import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { Group, Subgroup } from "@rota/core/models/group";
import { Product } from "@rota/core/models/product";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { ResourceManagementStoreActions, ResourceManagementStoreSelectores } from "../store";

@Component({
  selector: "rota-product-editor",
  templateUrl: "./product-editor.component.html",
  styleUrls: ["./product-editor.component.scss"],
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  private groups$ = new BehaviorSubject<Group[]>(undefined);
  private image: File;
  private ngUnsubscribe$ = new Subject<void>();

  imageLoading = true;
  productToEdit: Product;
  subgroups$: Observable<Subgroup[]>;
  filteredSubgroups$: Observable<Subgroup[]>;
  isLoading$: Observable<boolean>;
  form: FormGroup;
  imagePreviewSrc: string;
  fileFormatError: boolean;
  imageRequiredError: boolean;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.pipe(select(RestaurantStoreSelectors.selectGroups), takeUntil(this.ngUnsubscribe$)).subscribe(this.groups$);
    this.isLoading$ = this.store.pipe(select(ResourceManagementStoreSelectores.selectIsLoading));
    this.formInitializer();
    this.initSubgroups();
  }

  onImageLoaded() {
    this.imageLoading = false;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  saveProduct(): void {
    if (this.productToEdit) {
      this.store.dispatch(ResourceManagementStoreActions.editProduct({ product: { id: this.productToEdit.id, ...this.product } }));
      return;
    }

    this.imageRequiredError = false;
    if (!this.image) {
      this.imageRequiredError = true;
      return;
    }

    this.store.dispatch(ResourceManagementStoreActions.addProduct({ product: this.product, image: this.image }));
  }

  attachImage(event: { target: { files: File[] } }): void {
    if (!event.target.files[0]) {
      return;
    }

    if (!isImageType(event.target.files[0].type)) {
      this.fileFormatError = true;
      return;
    }

    this.image = event.target.files[0];
    this.setPreview(event.target.files[0]);
    this.fileFormatError = false;
  }

  private formInitializer(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get("id")),
        switchMap((id) => this.store.pipe(select(RestaurantStoreSelectors.selectProductById, { id }))),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((product) => {
        if (!product) {
          this.form = this.initForm();
          return;
        }

        this.form = this.initForm(product);
        this.productToEdit = product;
      });
  }

  private initSubgroups(): void {
    this.subgroups$ = this.groups$.pipe(
      map((groups) => {
        const subgroups: Subgroup[] = [];
        groups.forEach((group) => group.subgroups.forEach((subgroup) => subgroups.push(subgroup)));

        return subgroups;
      })
    );
  }

  private setPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (_event) => (this.imagePreviewSrc = reader.result as string);
    reader.readAsDataURL(file);
  }

  private initForm(product?: Product): FormGroup {
    if (product) {
      this.imagePreviewSrc = product.imageUrl;
    }

    return new FormGroup({
      name: new FormControl(product ? product.name : "", Validators.required),
      subgroup: new FormControl(product ? product.subgroup.id : "", Validators.required),
      ingredients: new FormControl(product ? product.ingredients : ""),
      allergens: new FormControl(product ? product.allergens : ""),
      description: new FormControl(product ? product.description : ""),
      preparationTime: new FormControl(product ? product.preparationTime : "", Validators.pattern("[1-9]+[0-9]?")),
      price: new FormControl(product ? product.price : "", [Validators.required, Validators.pattern("[0-9.]+")]),
    });
  }

  private get product(): Product {
    const subgroupId = this.form.get("subgroup").value;
    const group = this.getCorrespondingGroup(subgroupId);
    const correspongingSubgroup = group.subgroups.find((subgroup) => subgroup.id === subgroupId);

    return {
      name: this.form.controls.name.value,
      groupName: group.name,
      subgroup: correspongingSubgroup,
      ingredients: this.form.controls.ingredients.value,
      allergens: this.form.controls.allergens.value,
      description: this.form.controls.description.value,
      preparationTime: this.form.controls.preparationTime.value,
      price: +this.form.controls.price.value,
    };
  }

  private getCorrespondingGroup(subgroupId: string): Group {
    return this.groups$.value.find((group) => group.subgroups.some((subgroup) => subgroup.id === subgroupId));
  }
}

function isImageType(fileType: string): boolean {
  return fileType.search(/image/gi) !== -1;
}
