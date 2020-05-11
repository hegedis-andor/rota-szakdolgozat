import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Observable, of } from "rxjs";
import { AppState } from "../../models/app-state";
import { adminNavigationData, chefNavigationData, defaultData, getOrderingNavigationData, resourceNavigationData } from "../sidenav-datas";
import { SidenavData } from "../sidenav-datas/sidenav-data.model";

@Injectable()
export class NavigationService {
  constructor(private store: Store<AppState>) {}

  getNavData(moduleName: string): Observable<SidenavData> {
    switch (moduleName) {
      case "admin":
        return of(adminNavigationData);

      case "resource-management":
        return of(resourceNavigationData);

      case "ordering": {
        const groups$ = this.store.pipe(select(RestaurantStoreSelectors.selectGroups));
        return getOrderingNavigationData(groups$);
      }

      case "chef":
        return of(chefNavigationData);

      default:
        return of(defaultData);
    }
  }
}
