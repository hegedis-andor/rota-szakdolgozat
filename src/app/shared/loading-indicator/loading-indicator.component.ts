import { Component, Input } from "@angular/core";

@Component({
  selector: "loading-indicator",
  templateUrl: "./loading-indicator.component.svg",
  styleUrls: ["./loading-indicator.component.scss"]
})
export class LoadingIndicatorComponent {
  @Input() size = 24;
}
