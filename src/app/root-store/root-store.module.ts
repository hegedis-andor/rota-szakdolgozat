import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RestaurantStoreModule } from "./restaurant-store/restaurant-store.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forRoot({}), EffectsModule.forRoot([]), RestaurantStoreModule]
})
export class RootStoreModule {}
