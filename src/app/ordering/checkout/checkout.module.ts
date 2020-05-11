import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AmountSelectorModule } from "@rota/shared/amount-selector";
import { ButtonOutlinedModule } from "@rota/shared/button-outlined/button-outlined.module";
import { CheckoutRoutingModule } from "./checkout-routing.module";
import { CheckoutComponent } from "./checkout.component";

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, CheckoutRoutingModule, AmountSelectorModule, ButtonOutlinedModule, TranslateModule.forChild()]
})
export class CheckoutModule {}
