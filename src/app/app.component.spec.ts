import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { AppComponent } from "./app.component";
import { AppState } from "./core/models";
import { NavigationService } from "./core/sidenav/service/navigation.service";

fdescribe("AppComponent", () => {
  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
  let translateService;
  let mockStore: MockStore<AppState>;
  const initialState = <AppState> { restaurant: { language: "en" } };

  beforeEach(async(() => {
    translateService = jasmine.createSpyObj("TranslateService", ["use", "setDefaultLang"]);
    statusBarSpy = jasmine.createSpyObj("StatusBar", ["styleDefault"]);
    splashScreenSpy = jasmine.createSpyObj("SplashScreen", ["hide"]);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj("Platform", { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        NavigationService,
        { provide: TranslateService, useValue: translateService },
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        provideMockStore({ initialState }),
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should initialize the app", async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  describe("setLanguage", () => {
    beforeEach(() => {
      TestBed.createComponent(AppComponent);
      mockStore = TestBed.get(Store);
    });

    it("should set the default language to hun", () => {
      expect(translateService.setDefaultLang).toHaveBeenCalledWith("hun");
    });

    it("should set the language from the store", () => {
      mockStore.setState(<AppState> { restaurant: { language: "en" } });
      expect(translateService.use).toHaveBeenCalledWith("en");
    });
  });

  describe("changeSidenavModeOnScreenSizeChange", () => {
    let component: AppComponent;
    let breakpointObserver: BreakpointObserver;
    beforeEach(() => {
      breakpointObserver = TestBed.get(BreakpointObserver);
    });

    it("should set sidenav mode side if it matches the breakpoint", () => {
      spyOn(breakpointObserver, "observe").and.returnValue(of(<BreakpointState> { matches: true }));
      const fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      expect(component.sidenavMode).toBe("side");
    });

    it("should set sidenav mode over if it does not match the breakpoint", () => {
      spyOn(breakpointObserver, "observe").and.returnValue(of(<BreakpointState> { matches: false }));
      const fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      expect(component.sidenavMode).toBe("over");
    });
  });
});
