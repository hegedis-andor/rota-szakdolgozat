import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface AuthFormData {
  form: FormGroup;
  formControls: FormControlData[];
}

export interface FormControlData {
  type: string;
  name: string;
  placeholder: string;
  icon: string;
  hint?: string;
}

@Component({
  selector: "auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"]
})
export class AuthFormComponent {
  @Input() authFormData: AuthFormData;
}
