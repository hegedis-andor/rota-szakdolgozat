import { NavigationItem } from "@rota/core/sidenav/sidenav.component";

export interface SidenavData {
  navigationData: NavigationItem[];
  shouldHave: boolean;
  title: string;
  icon: string;
}
