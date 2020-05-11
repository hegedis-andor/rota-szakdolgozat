import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { RestaurantCredentials } from "../models/restaurant-credentials.model";
import { UserCredentials } from "../models/user-credentials.model";

const CREATE_RESTAURANT_URL = "https://us-central1-ordering-app-fc78f.cloudfunctions.net/createRestaurant";
const JOIN_RESTAURANT_URL = "https://us-central1-ordering-app-fc78f.cloudfunctions.net/joinRestaurant";

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  registerWithEmailAndPassword({ email, password }: UserCredentials) {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  loginWithEmailAndPassword({ email, password }: UserCredentials) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  createRestaurant({ name, password, userId }: RestaurantCredentials): Observable<any> {
    const params = new HttpParams().set("name", name).set("password", password).set("creator", userId);
    return this.http.post<RestaurantCredentials>(CREATE_RESTAURANT_URL, params);
  }

  joinRestaurant({ name, password, userId }: RestaurantCredentials): Observable<any> {
    const params = new HttpParams().set("name", name).set("password", password).set("userId", userId);

    return this.http.post<RestaurantCredentials>(JOIN_RESTAURANT_URL, params);
  }
}
