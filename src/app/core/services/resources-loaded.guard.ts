import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppState } from "../models/app-state";

@Injectable()
export class ResourcesLoadedGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(_next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(RestaurantStoreSelectors.selectAreResourcesLoaded),
      map(areResourcesLoaded => {
        if (areResourcesLoaded) {
          return true;
        }

        this.router.navigate(["/loading-resources"], { queryParams: { redirectUrl: state.url } });
        return false;
      })
    );
  }
}
