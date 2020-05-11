import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AmountSelectorComponent } from "./amount-selector.component";

@NgModule({
  declarations: [AmountSelectorComponent],
  imports: [CommonModule],
  exports: [AmountSelectorComponent]
})
export class AmountSelectorModule {}
