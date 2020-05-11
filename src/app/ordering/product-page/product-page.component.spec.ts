import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateModule } from "@ngx-translate/core";
import { AppState, CartItem, Product } from "@rota/core/models";
import { AmountSelectorModule } from "@rota/shared/amount-selector";
import { of } from "rxjs";
import { OrderingStoreActions } from "../store";
import { ProductPageComponent } from "./product-page.component";

fdescribe("ProductPageComponent", () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let store: MockStore<AppState>;
  const products: Product[] = [<Product> { id: "p1", name: "p1-name" }, <Product> { id: "p2", name: "p2-name" }];
  const initialState = <AppState> { restaurant: { products } };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPageComponent],
      imports: [TranslateModule.forRoot(), AmountSelectorModule, RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: "p1" }))
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should select product that matches the id from the route param", () => {
    let product: Product;
    component.product$.subscribe(notification => (product = notification)).unsubscribe();
    expect(product).toEqual(products[0]);
  });

  it("should add product to cart as a CartItem", () => {
    spyOn(store, "dispatch");
    const product = products[0];
    const expectedCartItem: CartItem = {
      product,
      amount: component.selectedAmount
    };

    component.addToCart(product);

    expect(store.dispatch).toHaveBeenCalledWith(OrderingStoreActions.addToCart({ cartItem: expectedCartItem }));
  });

  it("should return original string if it is defined", () => {
    expect(component.convertToNAIfEmpty("string")).toBe("string");
  });

  it("should return N/A if input string is undefined", () => {
    expect(component.convertToNAIfEmpty(undefined)).toBe("N/A");
  });
});
