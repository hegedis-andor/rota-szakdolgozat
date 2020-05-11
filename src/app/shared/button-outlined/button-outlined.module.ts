import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingIndicatorModule } from "../loading-indicator/loading-indicator.module";
import { ButtonOutlinedComponent } from "./button-outlined.component";

@NgModule({
  declarations: [ButtonOutlinedComponent],
  imports: [CommonModule, LoadingIndicatorModule],
  exports: [ButtonOutlinedComponent]
})
export class ButtonOutlinedModule {}
