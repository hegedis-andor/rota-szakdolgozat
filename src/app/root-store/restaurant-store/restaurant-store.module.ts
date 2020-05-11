import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RestaurnatStoreAuthEffects, RestaurnatStoreResourceEffects, RestaurnatStoreSettingEffects } from "./effects";
import { restaurantReducer } from "./restaurant.reducer";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("restaurant", restaurantReducer),
    EffectsModule.forFeature([RestaurnatStoreAuthEffects, RestaurnatStoreResourceEffects, RestaurnatStoreSettingEffects])
  ]
})
export class RestaurantStoreModule {}
