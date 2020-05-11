import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform } from "@ionic/angular";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap, takeUntil } from "rxjs/operators";
import { AppState } from "./core/models/app-state";
import { NavigationService } from "./core/sidenav/service/navigation.service";
import { SidenavData } from "./core/sidenav/sidenav-datas/sidenav-data.model";
import { SidenavComponent } from "./core/sidenav/sidenav.component";
import { RestaurantStoreAuthActions, RestaurantStoreSelectors } from "./root-store/restaurant-store";

@Component({
  selector: "rota-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnDestroy {
  @ViewChild("rotaSidenav", { static: false }) private sidenav: SidenavComponent;
  sidenavData$: Observable<SidenavData>;
  sidenavMode: "side" | "over";
  private ngUnsubscribe$ = new Subject<void>();
  private defaultLanguage = "hun";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navService: NavigationService,
    private translate: TranslateService,
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.initializeApp();
    this.changeSidenavModeOnScreenSizeChange();
    this.setLanguage();
    this.initSidenavData();
    this.store.dispatch(RestaurantStoreAuthActions.loadRestaurantFromLocalStorage());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openSidenav() {
    this.sidenav.toggle();
  }

  private changeSidenavModeOnScreenSizeChange(): void {
    this.breakpointObserver.observe(["(min-width: 599px)"]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavMode = "side";
      } else {
        this.sidenavMode = "over";
      }
    });
  }

  private setLanguage(): void {
    this.translate.setDefaultLang(this.defaultLanguage);
    this.store
      .pipe(
        select(RestaurantStoreSelectors.selectLanguage),
        filter((language) => !!language),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((language) => this.translate.use(language));
  }

  private initSidenavData(): void {
    this.sidenavData$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
      map((navStart: NavigationStart) => navStart.url.split("/")[1]),
      distinctUntilChanged(),
      switchMap((moduleName: string) => this.navService.getNavData(moduleName))
    );
  }
}
