import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { isNull, isUndefined } from "util";

@Injectable()
export class RedirectIfFullyAuthenticated implements CanActivate {
  constructor(private store$: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store$.pipe(
      select(RestaurantStoreSelectors.selectRestaurant),
      map((restaurant: { restaurantId: string; restaurantName: string }) => {
        if (isNull(restaurant.restaurantId) || isUndefined(restaurant.restaurantId)) {
          return true;
        }

        this.router.navigateByUrl("admin");
        return false;
      })
    );
  }
}
