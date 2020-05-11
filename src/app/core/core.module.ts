import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTreeModule } from "@angular/material/tree";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonOutlinedModule } from "../shared/button-outlined/button-outlined.module";
import { LoadingIndicatorModule } from "../shared/loading-indicator/loading-indicator.module";
import { LoadResourcesComponent } from "./load-resources/load-resources.component";
import { ResourcesLoadedGuard } from "./services/resources-loaded.guard";
import { RestaurantService } from "./services/restaurant.service";
import { NavigationService } from "./sidenav/service/navigation.service";
import { SidenavComponent } from "./sidenav/sidenav.component";

@NgModule({
  declarations: [LoadResourcesComponent, SidenavComponent],
  imports: [
    CommonModule,
    LoadingIndicatorModule,
    ButtonOutlinedModule,
    TranslateModule.forChild(),
    MatSidenavModule,
    MatTreeModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  providers: [NavigationService, RestaurantService, ResourcesLoadedGuard],
  exports: [SidenavComponent]
})
export class CoreModule {}
