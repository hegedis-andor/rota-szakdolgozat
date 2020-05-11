import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { RestaurantAuthComponent } from "./restaurant-auth/restaurant-auth.component";
import { RedirectIfFullyAuthenticated } from "./services/authenticated.guard";
import { UserAuthComponent } from "./user-auth/user-auth.component";

const redirectUnauthorizedToUserAuth = () => redirectUnauthorizedTo(["authentication/user"]);
const redirectLoggedInToRestaurantAuth = () => redirectLoggedInTo(["authentication/restaurant"]);

const routes: Routes = [
  {
    path: "user",
    component: UserAuthComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToRestaurantAuth }
  },
  {
    path: "restaurant",
    component: RestaurantAuthComponent,
    canActivate: [AngularFireAuthGuard, RedirectIfFullyAuthenticated],
    data: { authGuardPipe: redirectUnauthorizedToUserAuth }
  },
  { path: "", redirectTo: "user", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
