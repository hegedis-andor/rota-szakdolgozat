import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ResourceManagementStoreEffects } from "./resource-management.effects";
import { resourceManagementReducer } from "./resource-management.reducer";
import { ResourceManagementUtilsStoreEffects } from "./resource-managemet-utils.effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("resourceManagement", resourceManagementReducer),
    EffectsModule.forFeature([ResourceManagementStoreEffects, ResourceManagementUtilsStoreEffects])
  ]
})
export class ResourceManagementStoreModule {}
