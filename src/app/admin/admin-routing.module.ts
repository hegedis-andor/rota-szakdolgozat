import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { ResourcesLoadedGuard } from "@rota/core/services/resources-loaded.guard";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AdminSettingsComponent } from "./admin-settings/admin-settings.component";

const redirectUnauthorizedToAuthentication = () => redirectUnauthorizedTo(["authentication"]);

const routes: Routes = [
  {
    path: "account",
    component: AdminPageComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  {
    path: "settings",
    component: AdminSettingsComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  { path: "", pathMatch: "full", redirectTo: "account" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
