import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TranslateModule } from "@ngx-translate/core";
import { AppState, Product } from "@rota/core/models";
import { LoadingIndicatorModule } from "@rota/shared/loading-indicator/loading-indicator.module";
import { of } from "rxjs";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductListComponent } from "./product-list.component";

fdescribe("ProductListComponent", () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let router: Router;
  const product1 = <Product> { id: "p-id", name: "product", groupName: "gropuName", subgroup: { name: "s-name" } };
  const product2 = <Product> { id: "p-id2", name: "p-name", groupName: "g-name", subgroup: { name: "s-name" } };
  const initialState = <AppState> { restaurant: { products: [product1, product2] } };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductCardComponent],
      imports: [TranslateModule.forRoot(), LoadingIndicatorModule, RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ filterCriteria: "gropuName" })),
          },
        },
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should only have products which matches the paramMap filterCriteria", () => {
    let filteredProducts: Product[];
    component.products$.subscribe((notification) => (filteredProducts = notification)).unsubscribe();
    expect(filteredProducts).toEqual([product1]);
  });

  it("should open product page with the product id", () => {
    spyOn(router, "navigate");
    component.openProdcutPage(product1);
    expect(router.navigate).toHaveBeenCalledWith(["ordering/product", product1.id]);
  });
});
