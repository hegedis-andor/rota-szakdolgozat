import { animate, state, style, transition, trigger } from "@angular/animations";

export const expandAnimation = trigger("expandAnimation", [
  state(
    "open",
    style({
      overflow: "hidden",
      height: "*"
    })
  ),
  state(
    "close",
    style({
      overflow: "hidden",
      height: "0px"
    })
  ),
  transition("open => close", animate("300ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
  transition("close => open", animate("250ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
]);
