import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TranslateModule } from "@ngx-translate/core";
import { SnackbarService } from "./services";
import { SnackbarComponent } from "./snackbar.component";

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MatSnackBarModule, TranslateModule.forChild()],
  providers: [SnackbarService],
  exports: [SnackbarComponent],
  entryComponents: [SnackbarComponent]
})
export class SnackbarModule {}
