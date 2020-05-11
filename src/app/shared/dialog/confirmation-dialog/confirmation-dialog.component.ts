import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "rota-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"]
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      text: string;
      optionalText?: string;
      actions: { confrim: string; cancel: string; danger?: boolean };
    },
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }
}