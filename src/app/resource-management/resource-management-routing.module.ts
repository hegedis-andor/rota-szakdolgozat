import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { ResourcesLoadedGuard } from "@rota/core/services/resources-loaded.guard";
import { GroupEditorComponent } from "./group-editor/group-editor.component";
import { ModifyComponent } from "./modify/modify.component";
import { ProductEditorComponent } from "./product-editor/product-editor.component";
import { TableEditorComponent } from "./table-editor/table-editor.component";

const redirectUnauthorizedToAuthentication = () => redirectUnauthorizedTo(["authentication"]);

const routes: Routes = [
  {
    path: "table-editor",
    component: TableEditorComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  {
    path: "group-editor",
    component: GroupEditorComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  {
    path: "product-editor",
    component: ProductEditorComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  {
    path: "modify",
    component: ModifyComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },

  { path: "", pathMatch: "full", redirectTo: "table-editor" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceManagementRoutingModule {}
