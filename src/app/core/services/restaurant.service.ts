import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Group, Order, Product, Table } from "@rota/core/models";
import { Observable, of } from "rxjs";

@Injectable()
export class RestaurantService {
  constructor(private afs: AngularFirestore) {}

  getTables(restaurantId: string): Observable<any> {
    return this.afs.collection<Table[]>(`restaurants/${restaurantId}/tables`).valueChanges();
  }

  getGroups(restaurantId: string): Observable<any> {
    return this.afs.collection<Group[]>(`restaurants/${restaurantId}/groups`).valueChanges();
  }

  getProducts(restaurantId: string): Observable<any> {
    return this.afs.collection<Product[]>(`restaurants/${restaurantId}/products`).valueChanges();
  }

  getOrdersByStatus(status: string, restaurantId: string): Observable<Order[]> {
    return this.afs
      .collection<Order>(`restaurants/${restaurantId}/orders`, (ref) => ref.where("status", "==", status))
      .valueChanges();
  }

  saveLanguage(language: string, restaurantId: string): Observable<any> {
    return of(this.afs.doc(`settingsByRestaurants/${restaurantId}`).update({ language }));
  }

  saveCurrency(currency: string, restaurantId: string): Observable<any> {
    return of(this.afs.doc(`settingsByRestaurants/${restaurantId}`).update({ currency }));
  }

  getSettings(restaurantId: string): Observable<any> {
    return this.afs.doc(`settingsByRestaurants/${restaurantId}`).valueChanges();
  }
}
