import { Component } from "@angular/core";
import { expandAnimation } from "./expand.animation";

@Component({
  selector: "expansion-panel",
  templateUrl: "./expansion-panel.component.html",
  styleUrls: ["./expansion-panel.component.scss"],
  animations: [expandAnimation]
})
export class ExpansionPanelComponent {
  open = true;
}
