import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ExpansionPanelComponent } from "./expansion-panel.component";

@NgModule({
  declarations: [ExpansionPanelComponent],
  imports: [CommonModule],
  exports: [ExpansionPanelComponent]
})
export class ExpansionPanelModule {}
