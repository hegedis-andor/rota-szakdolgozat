import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonOutlinedModule } from "../shared/button-outlined/button-outlined.module";
import { AccountComponent } from "./account/account.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminSettingsComponent } from "./admin-settings/admin-settings.component";

@NgModule({
  declarations: [AdminPageComponent, AccountComponent, AdminSettingsComponent],
  imports: [CommonModule, AdminRoutingModule, TranslateModule.forChild(), ButtonOutlinedModule, MatSelectModule]
})
export class AdminModule {}
