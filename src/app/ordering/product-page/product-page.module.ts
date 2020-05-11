import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AmountSelectorModule } from "@rota/shared/amount-selector";
import { ProductPageComponent } from "./product-page.component";

@NgModule({
  declarations: [ProductPageComponent],
  imports: [CommonModule, TranslateModule.forChild(), AmountSelectorModule]
})
export class ProductPageModule {}
