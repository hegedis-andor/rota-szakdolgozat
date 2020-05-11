import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

export interface DialogConfig {
  backdropClass?: string;
  panelClass?: string | string[];
  data?: any;
  hasBackdrop?: boolean;
  maxHeight?: number | string;
  maxWidth?: number | string;
  autoFocus?: boolean;
}

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog<T, U>(component: ComponentType<T>, config?: DialogConfig): MatDialogRef<T, U> {
    return this.dialog.open(component, { ...config });
  }
}
