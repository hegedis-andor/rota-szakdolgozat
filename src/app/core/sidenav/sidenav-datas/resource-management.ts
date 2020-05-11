import { NavigationItem } from "../sidenav.component";
import { SidenavData } from "./sidenav-data.model";

const navigationData: NavigationItem[] = [
  {
    main: {
      name: "RESOURCE_MANAGEMENT.SIDENAV_ROUTE.TABLE",
      route: "resource-management/table-editor"
    }
  },
  {
    main: {
      name: "RESOURCE_MANAGEMENT.SIDENAV_ROUTE.GROUP",
      route: "resource-management/group-editor"
    }
  },
  {
    main: {
      name: "RESOURCE_MANAGEMENT.SIDENAV_ROUTE.PRODUCT",
      route: "resource-management/product-editor"
    }
  },
  {
    main: {
      name: "RESOURCE_MANAGEMENT.SIDENAV_ROUTE.MODIFY",
      route: "resource-management/modify"
    }
  },
  {
    main: {
      name: "RESOURCE_MANAGEMENT.SIDENAV_ROUTE.BACK_TO_ADMIN",
      route: "admin/account"
    }
  }
];

export const resourceNavigationData: SidenavData = {
  icon: "chrome_reader_mode",
  title: "RESOURCE_MANAGEMENT.SIDENAV_TITLE",
  shouldHave: true,
  navigationData
};
