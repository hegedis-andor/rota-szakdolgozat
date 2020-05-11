import { TestBed } from "@angular/core/testing";
import { Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { AppState } from "../models";
import { ResourcesLoadedGuard } from "./resources-loaded.guard";

fdescribe("ResourcesLoadedGuard", () => {
  let mockStore: MockStore<AppState>;
  let guard: ResourcesLoadedGuard;
  let router: Router;

  const initialState = <AppState> { restaurant: { areResourcesLoaded: false } };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResourcesLoadedGuard,
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: jasmine.createSpyObj("Router", ["navigate"]),
        },
      ],
    });

    router = TestBed.get(Router);
    guard = TestBed.get(ResourcesLoadedGuard);
    mockStore = TestBed.get(Store);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  it("should return true if the resources are loaded in the store", () => {
    mockStore.setState(<AppState> { restaurant: { areResourcesLoaded: true } });
    const state = <RouterStateSnapshot> { url: "url" };
    let canActivate: boolean;
    guard
      .canActivate(undefined, state)
      .subscribe((notification) => (canActivate = notification))
      .unsubscribe();

    expect(canActivate).toBe(true);
  });

  it("should return false if the resources are not loaded and navigate to loading resources with the returnUrl", () => {
    const state = <RouterStateSnapshot> { url: "url" };
    let canActivate: boolean;
    guard
      .canActivate(undefined, state)
      .subscribe((notification) => (canActivate = notification))
      .unsubscribe();

    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(["/loading-resources"], { queryParams: { redirectUrl: state.url } });
  });
});
