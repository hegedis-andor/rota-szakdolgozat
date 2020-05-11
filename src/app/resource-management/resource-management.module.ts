import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingIndicatorModule } from "@rota/shared/loading-indicator/loading-indicator.module";
import { ButtonOutlinedModule } from "../shared/button-outlined/button-outlined.module";
import { ConfirmationDialogModule, DialogModule } from "../shared/dialog";
import { ExpansionPanelModule } from "../shared/expansion-panel/expansion-panel.module";
import { SnackbarModule } from "../shared/snackbar";
import { GroupEditorComponent } from "./group-editor/group-editor.component";
import { ModifyComponent } from "./modify/modify.component";
import { ProductEditorComponent } from "./product-editor/product-editor.component";
import { ResourceManagementRoutingModule } from "./resource-management-routing.module";
import { ResourceManagementService } from "./services/resource-management.service";
import { ResourceManagementStoreModule } from "./store/resource-management-store.module";
import { TableEditorComponent } from "./table-editor/table-editor.component";

@NgModule({
  declarations: [ModifyComponent, TableEditorComponent, GroupEditorComponent, ProductEditorComponent],
  imports: [
    CommonModule,
    ResourceManagementRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule.forChild(),
    ButtonOutlinedModule,
    ResourceManagementStoreModule,
    ExpansionPanelModule,
    DialogModule,
    ConfirmationDialogModule,
    SnackbarModule,
    LoadingIndicatorModule,
    MatSelectModule,
  ],
  providers: [ResourceManagementService],
})
export class ResourceManagementModule {}
