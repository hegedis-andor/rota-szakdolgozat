import { fakeAsync, TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { AppState, CartItem, Order } from "@rota/core/models";
import { cold, hot } from "jasmine-marbles";
import { Observable, of, throwError } from "rxjs";
import { OrderingStoreActions } from "..";
import { OrderingService } from "../../services";
import { OrderingStoreEffects } from "./ordering.effects";

fdescribe("OrderingStoreEffects", () => {
  let actions$: Observable<Action>;
  let orderingStoreEffects: OrderingStoreEffects;
  let orderingService: jasmine.SpyObj<OrderingService>;
  const restaurantId = "r-id01";
  const initialState = <AppState> { restaurant: { id: restaurantId } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OrderingStoreEffects,
        {
          provide: OrderingService,
          useValue: jasmine.createSpyObj<OrderingService>(["placeOrder"]),
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });

    orderingStoreEffects = TestBed.get(OrderingStoreEffects);
    orderingService = TestBed.get(OrderingService);
  });

  it("should create", () => {
    expect(orderingStoreEffects).toBeTruthy();
  });

  describe("addToCart", () => {
    it("should return openSuccessSnackbar action with success text", () => {
      const cartItem = <CartItem> { product: { id: "p-id01" } };
      actions$ = hot("-a", { a: OrderingStoreActions.addToCart({ cartItem }) });
      const text = "ORDERING.PRODUCT_PAGE.SNACKBAR_SUCCESS_TEXT";
      const expected = hot("-a", { a: OrderingStoreActions.openSuccessSnackbar({ text }) });

      expect(orderingStoreEffects.addToCart$).toBeObservable(expected);
    });
  });

  describe("placeOrder", () => {
    const order = <Order> { id: "o-id01" };

    it("should return openSuccessSnackbar with text and orderSuccessfullyPlaced action", () => {
      actions$ = hot("-a", { a: OrderingStoreActions.placeOrder({ order }) });
      const text = "ORDERING.CHECKOUT.SNACKBAR_SUCCESS_TEXT";
      const expected = cold("-(bc)", {
        b: OrderingStoreActions.openSuccessSnackbar({ text }),
        c: OrderingStoreActions.orderSuccessfullyPlaced(),
      });
      orderingService.placeOrder.and.returnValue(of(null));

      expect(orderingStoreEffects.placeOrder$).toBeObservable(expected);
    });

    it("should return openErrorSnackbar with text on error", () => {
      actions$ = hot("-a", { a: OrderingStoreActions.placeOrder({ order }) });
      const text = "ORDERING.CHECKOUT.SNACKBAR_FAIL_TEXT";
      const expected = cold("-b", {
        b: OrderingStoreActions.openErrorSnackbar({ text }),
      });
      orderingService.placeOrder.and.returnValue(throwError("Failed"));
      expect(orderingStoreEffects.placeOrder$).toBeObservable(expected);
    });

    it("should call placeOrder with the restauranId from store and order from payload", fakeAsync(() => {
      actions$ = cold("-a", { a: OrderingStoreActions.placeOrder({ order }) });
      orderingService.placeOrder.and.returnValue(of(null));
      orderingStoreEffects.placeOrder$.subscribe(() => {
        expect(orderingService.placeOrder).toHaveBeenCalledWith(order, restaurantId);
      });
    }));
  });
});
