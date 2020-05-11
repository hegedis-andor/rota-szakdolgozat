import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Order } from "@rota/core/models";
import { Observable, of } from "rxjs";

@Injectable()
export class ChefService {
  constructor(private afs: AngularFirestore) {}

  updateOrder(order: Order, restaurantId: string): Observable<any> {
    return of(this.afs.doc(`restaurants/${restaurantId}/orders/${order.id}`).update(order));
  }
}
