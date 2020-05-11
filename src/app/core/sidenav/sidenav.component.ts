import { Component, Input, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

export interface NavigationItem {
  main: MainNavigation;
  sub?: SubNavigation[];
}

export interface MainNavigation {
  name: string;
  route: string | Array<string>;
}

export interface SubNavigation {
  name: string;
  route: string | Array<string>;
}

@Component({
  selector: "rota-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent {
  @ViewChild("sidenav", { static: false }) private sidenav: MatSidenav;
  @Input() navigationData: NavigationItem[];
  @Input() title: string;
  @Input() icon: string;
  @Input() mode: "side" | "over" | "push" = "side";
  @Input() opened: boolean;
  @Input() shouldHaveSidenav: boolean;

  toggle() {
    this.sidenav.toggle();
  }
}
