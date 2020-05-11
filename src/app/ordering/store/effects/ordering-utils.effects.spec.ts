import { fakeAsync, TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { SnackbarService } from "@rota/shared/snackbar/services";
import { cold } from "jasmine-marbles";
import { Observable } from "rxjs";
import { OrderingStoreActions } from "..";
import { OrderingStoreUtilsEffects } from "./ordering-utils.effects";

fdescribe("OrderingStoreUtilsEffects", () => {
  let actions$: Observable<Action>;
  let orderingStoreUtilsEffects: OrderingStoreUtilsEffects;
  let snackbarService: jasmine.SpyObj<SnackbarService>;
  const text = "text";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderingStoreUtilsEffects,
        provideMockActions(() => actions$),
        {
          provide: SnackbarService,
          useValue: jasmine.createSpyObj<SnackbarService>(["openDefaultSuccessSnackbar", "openDefaultErrorSnackbar"]),
        },
      ],
    });

    snackbarService = TestBed.get(SnackbarService);
    orderingStoreUtilsEffects = TestBed.get(OrderingStoreUtilsEffects);
  });

  it("should create", () => {
    expect(orderingStoreUtilsEffects).toBeTruthy();
  });

  describe("openSuccessSnackbar", () => {
    it("should open default success snackbar with the text payload", fakeAsync(() => {
      actions$ = cold("-a", { a: OrderingStoreActions.openSuccessSnackbar({ text }) });
      orderingStoreUtilsEffects.openSuccessSnackbar$.subscribe(() => {
        expect(snackbarService.openDefaultSuccessSnackbar).toHaveBeenCalledWith(text);
      });
    }));
  });

  describe("openErrorSnackbar", () => {
    it("should open default error snackbar with the text payload", fakeAsync(() => {
      actions$ = cold("-a", { a: OrderingStoreActions.openErrorSnackbar({ text }) });
      orderingStoreUtilsEffects.openErrorSnackbar$.subscribe(() => {
        expect(snackbarService.openDefaultErrorSnackbar).toHaveBeenCalledWith(text);
      });
    }));
  });
});
