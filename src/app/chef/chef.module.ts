import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatRadioModule } from "@angular/material/radio";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingIndicatorModule } from "@rota/shared/loading-indicator/loading-indicator.module";
import { ConfirmationDialogModule, DialogModule } from "../shared/dialog";
import { ExpansionPanelModule } from "../shared/expansion-panel";
import { SnackbarModule } from "../shared/snackbar";
import { ChefRoutingModule } from "./chef-routing.module";
import { ChefComponent } from "./chef.component";
import { OrderListItemComponent } from "./order-list-item/order-list-item.component";
import { ChefService } from "./services/chef.service";
import { StatusModifierComponent } from "./status-modifier-dialog";
import { ChefStoreModule } from "./store";

@NgModule({
  declarations: [ChefComponent, OrderListItemComponent, StatusModifierComponent],
  imports: [
    CommonModule,
    ChefRoutingModule,
    DialogModule,
    TranslateModule.forChild(),
    MatRadioModule,
    ConfirmationDialogModule,
    SnackbarModule,
    ExpansionPanelModule,
    ChefStoreModule,
    LoadingIndicatorModule,
  ],
  exports: [StatusModifierComponent],
  entryComponents: [StatusModifierComponent],
  providers: [ChefService],
})
export class ChefModule {}
