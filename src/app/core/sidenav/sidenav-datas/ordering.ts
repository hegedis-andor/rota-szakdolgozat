import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Group } from "../../models/group";
import { NavigationItem } from "../sidenav.component";
import { SidenavData } from "./sidenav-data.model";

const constantNavigationData: NavigationItem[] = [
  {
    main: {
      name: "ORDERING.SIDENAV_ROUTE.ADMIN",
      route: "admin/account",
    },
  },
  {
    main: {
      name: "ORDERING.SIDENAV_ROUTE.CHECKOUT",
      route: "ordering/checkout",
    },
  },
  {
    main: {
      name: "ORDERING.SIDENAV_ROUTE.SELECT_TABLE",
      route: "ordering/select-table",
    },
  },
  {
    main: {
      name: "ORDERING.SIDENAV_ROUTE.LIST_ALL",
      route: "ordering/products/All",
    },
  },
];

const orderingSideNavData: SidenavData = {
  icon: "assignment",
  title: "ORDERING.ORDERING_PAGE.SIDENAV_TITLE",
  shouldHave: true,
  navigationData: constantNavigationData,
};

export function getOrderingNavigationData(groups$: Observable<Group[]>) {
  return groups$.pipe(
    map((groups) => {
      const navigationItems: NavigationItem[] = [...constantNavigationData];
      if (groups) {
        buildNavigationDataFromGroups(groups).forEach((navItem) => navigationItems.push(navItem));
      }

      return {
        ...orderingSideNavData,
        navigationData: navigationItems,
      };
    })
  );
}

function buildNavigationDataFromGroups(groups: Group[]): NavigationItem[] {
  const navigationItems = [];

  groups.forEach((group) => {
    const main = {
      name: group.name,
      route: ["/ordering/products", group.name],
    };

    const subNav = [];
    if (group.subgroups) {
      group.subgroups.forEach((subgroup) => {
        const subgroupNav = {
          name: subgroup.name,
          route: ["/ordering/products", subgroup.name],
        };
        subNav.push(subgroupNav);
      });
    }

    const navData: NavigationItem = {
      main,
      sub: [...subNav],
    };

    navigationItems.push(navData);
  });

  return navigationItems;
}
