import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { ResourcesLoadedGuard } from "@rota/core/services/resources-loaded.guard";
import { ChefComponent } from "./chef.component";

const redirectUnauthorizedToAuthentication = () => redirectUnauthorizedTo(["authentication"]);

const routes: Routes = [
  {
    path: "",
    component: ChefComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule {}
