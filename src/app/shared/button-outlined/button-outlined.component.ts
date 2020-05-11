import { Component, Input } from "@angular/core";

@Component({
  selector: "button-outlined",
  templateUrl: "./button-outlined.component.html",
  styleUrls: ["./button-outlined.component.scss"]
})
export class ButtonOutlinedComponent {
  @Input() disabled: boolean;
  @Input() loading: boolean;
}
