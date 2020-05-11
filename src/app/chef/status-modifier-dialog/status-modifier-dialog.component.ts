import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "status-modifier-dialog",
  templateUrl: "./status-modifier-dialog.component.html",
  styleUrls: ["./status-modifier-dialog.component.scss"]
})
export class StatusModifierComponent {
  selectedOptionStatus: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { status: string }, public dialogRef: MatDialogRef<StatusModifierComponent>) {
    this.selectedOptionStatus = data.status;
  }

  save(): void {
    this.dialogRef.close(this.selectedOptionStatus);
  }
}
