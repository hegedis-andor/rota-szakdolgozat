import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { ResourcesLoadedGuard } from "@rota/core/services/resources-loaded.guard";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { TableSelectorComponent } from "./table-selector/table-selector.component";

const redirectUnauthorizedToAuthentication = () => redirectUnauthorizedTo(["authentication"]);

const routes: Routes = [
  {
    path: "select-table",
    component: TableSelectorComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  {
    path: "products/:filterCriteria",
    component: ProductListComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  {
    path: "product/:id",
    component: ProductPageComponent,
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  {
    path: "checkout",
    loadChildren: () => import("./checkout").then(m => m.CheckoutModule),
    canActivate: [AngularFireAuthGuard, ResourcesLoadedGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuthentication }
  },
  { path: "", redirectTo: "select-table", pathMatch: "full" },
  { path: "**", redirectTo: "select-table", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderingRoutingModule {}
