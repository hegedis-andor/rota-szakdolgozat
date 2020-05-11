import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../snackbar.component";

export interface SnackbarPosition {
  horizontal: "start" | "center" | "end" | "left" | "right";
  vertical: "top" | "bottom";
}

export interface SnackbarConfig {
  data?: { text: string; subText?: string; actionName?: string };
  duration?: number;
  position?: SnackbarPosition;
  panelClass: "snackbar-danger" | "snackbar-success";
}

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(config?: SnackbarConfig): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: config.data,
      duration: config.duration,
      horizontalPosition: config.position.horizontal,
      verticalPosition: config.position.vertical,
      panelClass: config.panelClass,
    });
  }

  openDefaultSuccessSnackbar(subText?: string): void {
    const config: SnackbarConfig = {
      position: { horizontal: "right", vertical: "top" },
      duration: 2500,
      data: {
        text: "SNACKBAR.SUCCESS_TEXT",
        subText,
        actionName: "SNACKBAR.SUCCESS_ACTION_NAME",
      },
      panelClass: "snackbar-success",
    };

    this.openSnackBar(config);
  }

  openDefaultErrorSnackbar(subText?: string): void {
    const config: SnackbarConfig = {
      position: { horizontal: "right", vertical: "top" },
      duration: 3000,
      data: {
        text: "SNACKBAR.ERROR_TEXT",
        subText,
        actionName: "SNACKBAR.ERROR_ACTION_NAME",
      },
      panelClass: "snackbar-danger",
    };

    this.openSnackBar(config);
  }
}
