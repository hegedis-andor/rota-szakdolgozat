import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthStoreEffects } from "./auth.effects";
import { authReducer } from "./auth.reducer";

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature("auth", authReducer), EffectsModule.forFeature([AuthStoreEffects])]
})
export class AuthStoreModule {}
