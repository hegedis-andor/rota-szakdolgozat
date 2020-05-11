import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Order } from "@rota/core/models";
import { from, Observable } from "rxjs";

@Injectable()
export class OrderingService {
  constructor(private afs: AngularFirestore) {}

  placeOrder(order: Order, restaurantId: string): Observable<void> {
    return from(this.afs.doc<Order>(`restaurants/${restaurantId}/orders/${order.id}`).set(order, { merge: true }));
  }
}
