import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "@rota/core/models/app-state";
import { RestaurantStoreAuthActions, RestaurantStoreSelectors } from "@rota/root-store/restaurant-store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "rota-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"]
})
export class AdminPageComponent implements OnInit {
  userEmail: string;
  restaurantName: string;
  path: string;
  ngUnsubscribe$ = new Subject<void>();

  constructor(private afAuth: AngularFireAuth, private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userEmail = this.afAuth.auth.currentUser.email;
    this.initRestaurantName();
    this.initPath();
  }

  signOut(): void {
    this.store.dispatch(RestaurantStoreAuthActions.signOut());
  }

  private initRestaurantName() {
    this.store
      .pipe(select(RestaurantStoreSelectors.selectName), takeUntil(this.ngUnsubscribe$))
      .subscribe(name => (this.restaurantName = name));
  }

  private initPath() {
    this.route.url.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(urlSegment => {
      if (urlSegment[0]) {
        this.path = urlSegment[0].path;
      }
    });
  }
}
