import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonOutlinedModule } from "../shared/button-outlined/button-outlined.module";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { RestaurantAuthComponent } from "./restaurant-auth/restaurant-auth.component";
import { AuthService } from "./services/auth.service";
import { RedirectIfFullyAuthenticated } from "./services/authenticated.guard";
import { AuthStoreModule } from "./store/auth-store.module";
import { UserAuthComponent } from "./user-auth/user-auth.component";

@NgModule({
  declarations: [UserAuthComponent, RestaurantAuthComponent, AuthFormComponent],
  providers: [AuthService, RedirectIfFullyAuthenticated],
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    ButtonOutlinedModule,
    AuthStoreModule,

    AuthRoutingModule,
  ],
})
export class AuthModule {}
