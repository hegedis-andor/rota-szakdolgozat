import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogService } from "./services";

@NgModule({
  imports: [CommonModule, MatDialogModule],
  providers: [DialogService]
})
export class DialogModule {}
