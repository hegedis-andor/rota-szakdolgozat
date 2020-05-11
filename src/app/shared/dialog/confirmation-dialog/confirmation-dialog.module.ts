import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, TranslateModule.forChild()],
  entryComponents: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule {}
