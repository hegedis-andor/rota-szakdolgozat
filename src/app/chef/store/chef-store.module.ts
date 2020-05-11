import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ChefStoreEffects } from "./chef.effects";
import { chefReducer } from "./chef.reducer";

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature("chef", chefReducer), EffectsModule.forFeature([ChefStoreEffects])],
})
export class ChefStoreModule {}
