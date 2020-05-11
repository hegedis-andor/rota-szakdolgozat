import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { RestaurantStoreSettingActions } from "@rota/root-store/restaurant-store/actions";

@Component({
  selector: "rota-admin-settings",
  templateUrl: "./admin-settings.component.html",
  styleUrls: ["./admin-settings.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSettingsComponent {
  selectedLanguage: string;
  selectedCurrency: string;

  constructor(private store$: Store<AppState>, private cd: ChangeDetectorRef) {}

  saveLanguage(): void {
    this.store$.dispatch(RestaurantStoreSettingActions.saveRestaurantLanguage({ language: this.selectedLanguage }));
    this.cd.markForCheck();
  }

  saveCurrency(): void {
    this.store$.dispatch(RestaurantStoreSettingActions.saveRestaurantCurrency({ currency: this.selectedCurrency }));
  }
}
