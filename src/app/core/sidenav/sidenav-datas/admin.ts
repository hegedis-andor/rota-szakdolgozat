import { NavigationItem } from "../sidenav.component";
import { SidenavData } from "./sidenav-data.model";

const navigationData: NavigationItem[] = [
  {
    main: {
      name: "ADMIN.ADMIN_PAGE.SIDENAV_ROUTE.ORDERING",
      route: "ordering"
    }
  },
  {
    main: {
      name: "ADMIN.ADMIN_PAGE.SIDENAV_ROUTE.CHEF",
      route: "chef"
    }
  },
  {
    main: {
      name: "ADMIN.ADMIN_PAGE.SIDENAV_ROUTE.RESOURCE_MANAGEMENT",
      route: "resource-management"
    }
  },
  {
    main: {
      name: "ADMIN.ADMIN_PAGE.SIDENAV_ROUTE.ACCOUNT",
      route: "admin/account"
    }
  },
  {
    main: {
      name: "ADMIN.ADMIN_PAGE.SIDENAV_ROUTE.SETTINGS",
      route: "admin/settings"
    }
  }
];

export const adminNavigationData: SidenavData = {
  icon: "face",
  title: "ADMIN.ADMIN_PAGE.SIDENAV_TITLE",
  shouldHave: true,
  navigationData
};
