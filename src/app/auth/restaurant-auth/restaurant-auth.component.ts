import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { Observable } from "rxjs";
import { AuthFormData } from "../auth-form/auth-form.component";
import { RestaurantCredentials } from "../models/restaurant-credentials.model";
import * as AuthStoreActions from "../store/auth.actions";
import * as AuthStoreSelectors from "../store/auth.selectors";

@Component({
  selector: "rota-restaurant-auth",
  templateUrl: "./restaurant-auth.component.html",
  styleUrls: ["./restaurant-auth.component.scss"]
})
export class RestaurantAuthComponent implements OnInit {
  restaurantFormData: AuthFormData;
  authError$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store$: Store<AppState>, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.restaurantFormData = this.initRestaurantFormData();
    this.authError$ = this.store$.pipe(select(AuthStoreSelectors.selectError));
    this.loading$ = this.store$.pipe(select(AuthStoreSelectors.selectIsLoading));
  }

  createRestaurant(): void {
    const restaurantCredentials = this.getRestaurantCredentials(this.restaurantFormData.form, this.userId);
    this.store$.dispatch(AuthStoreActions.createRestaurant({ restaurantCredentials }));
  }

  joinRestaurant(): void {
    const restaurantCredentials = this.getRestaurantCredentials(this.restaurantFormData.form, this.userId);
    this.store$.dispatch(AuthStoreActions.joinUserToRestaurant({ restaurantCredentials }));
  }

  resetError(): void {
    this.store$.dispatch(AuthStoreActions.setError({ error: null }));
  }

  private initRestaurantFormData(): AuthFormData {
    const form = new FormGroup({
      restaurantName: new FormControl("", [Validators.required, Validators.minLength(4)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });

    return {
      form,
      formControls: [
        {
          type: "text",
          name: "restaurantName",
          placeholder: "AUTH.RESTAURNAT.RESTAURANT_NAME_PLACEHOLDER",
          icon: "account_circle",
          hint: "AUTH.RESTAURNAT.RESTAURANT_NAME_MIN_CHAR_LENGTH"
        },
        {
          type: "password",
          name: "password",
          placeholder: "AUTH.RESTAURNAT.PASSWORD_PLACEHOLDER",
          icon: "lock",
          hint: "AUTH.RESTAURNAT.PASSWORD_MIN_CHAR_LENGTH"
        }
      ]
    };
  }

  private getRestaurantCredentials(form: FormGroup, userId: string): RestaurantCredentials {
    return {
      name: form.controls.restaurantName.value,
      password: form.controls.password.value,
      userId
    };
  }

  private get userId(): string {
    return this.afAuth.auth.currentUser.uid;
  }
}
