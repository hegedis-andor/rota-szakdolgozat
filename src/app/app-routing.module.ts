import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoadResourcesComponent } from "./core/load-resources/load-resources.component";

const redirectUnauthorizedToAuthentication = () => redirectUnauthorizedTo(["authentication"]);

const routes: Routes = [
  {
    path: "loading-resources",
    component: LoadResourcesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  {
    path: "authentication",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "resource-management",
    loadChildren: () => import("./resource-management/resource-management.module").then(m => m.ResourceManagementModule)
  },
  {
    path: "ordering",
    loadChildren: () => import("./ordering/ordering.module").then(m => m.OrderingModule)
  },
  {
    path: "chef",
    loadChildren: () => import("./chef/chef.module").then(m => m.ChefModule)
  },
  { path: "", redirectTo: "authentication", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
