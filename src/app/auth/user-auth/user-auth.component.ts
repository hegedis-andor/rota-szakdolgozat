import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { Observable } from "rxjs";
import { AuthFormData } from "../auth-form/auth-form.component";
import { UserCredentials } from "../models/user-credentials.model";
import * as AuthStoreActions from "../store/auth.actions";
import * as AuthStoreSelectors from "../store/auth.selectors";

@Component({
  selector: "rota-user-auth",
  templateUrl: "./user-auth.component.html",
  styleUrls: ["./user-auth.component.scss"]
})
export class UserAuthComponent implements OnInit {
  userFormData: AuthFormData;
  authError$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.userFormData = this.initUserFormData();
    this.authError$ = this.store$.pipe(select(AuthStoreSelectors.selectError));
    this.loading$ = this.store$.pipe(select(AuthStoreSelectors.selectIsLoading));
  }

  register(): void {
    const userCredentials = this.getUserCredentials(this.userFormData.form);
    this.store$.dispatch(AuthStoreActions.registerUser({ userCredentials }));
  }

  login(): void {
    const userCredentials = this.getUserCredentials(this.userFormData.form);
    this.store$.dispatch(AuthStoreActions.loginUser({ userCredentials }));
  }

  resetError(): void {
    this.store$.dispatch(AuthStoreActions.setError({ error: null }));
  }

  private initUserFormData(): AuthFormData {
    const form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });

    return {
      form,
      formControls: [
        {
          type: "text",
          name: "email",
          placeholder: "AUTH.USER.EMAIL_PLACEHOLDER",
          icon: "email"
        },
        {
          type: "password",
          name: "password",
          placeholder: "AUTH.USER.PASSWORD_PLACEHOLDER",
          icon: "lock",
          hint: "AUTH.USER.PASSWORD_MIN_CHAR_LENGTH"
        }
      ]
    };
  }

  private getUserCredentials(form: FormGroup): UserCredentials {
    return {
      email: form.controls.email.value,
      password: form.controls.password.value
    };
  }
}
