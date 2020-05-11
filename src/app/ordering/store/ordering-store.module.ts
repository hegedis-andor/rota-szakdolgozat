import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { OrderingStoreEffects, OrderingStoreUtilsEffects } from "./effects";
import { orderingReducer } from "./ordering.reducer";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("ordering", orderingReducer),
    EffectsModule.forFeature([OrderingStoreEffects, OrderingStoreUtilsEffects]),
  ],
})
export class OrderingStoreModule {}
