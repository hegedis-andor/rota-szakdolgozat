import { NavigationItem } from "../sidenav.component";
import { SidenavData } from "./sidenav-data.model";

const navigationData: NavigationItem[] = [
  {
    main: {
      name: "CHEF.SIDENAV_ROUTE.ADMIN",
      route: "admin/account"
    }
  }
];

export const chefNavigationData: SidenavData = {
  icon: "calendar_today",
  title: "CHEF.SIDENAV_TITLE",
  shouldHave: true,
  navigationData
};
