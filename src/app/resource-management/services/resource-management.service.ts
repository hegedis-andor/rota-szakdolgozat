import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Group, Table } from "@rota/core/models";
import { Product } from "@rota/core/models/product";
import { from, Observable } from "rxjs";
import { last, switchMap } from "rxjs/operators";

@Injectable()
export class ResourceManagementService {
  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {}

  addTable(name: string, numberOfSeats: number, restaurantId: string): Observable<void> {
    const id = this.afs.createId();
    return from(this.afs.doc<Table>(`restaurants/${restaurantId}/tables/${id}`).set({ id, name, numberOfSeats }));
  }

  editTable(table: Table, restaurantId: string): Observable<void> {
    return from(this.afs.doc<Table>(`restaurants/${restaurantId}/tables/${table.id}`).update(table));
  }

  deleteTable(id: string, restaurantId: string): Observable<void> {
    return from(this.afs.doc(`restaurants/${restaurantId}/tables/${id}`).delete());
  }

  addGroup(group: Group, restaurantId: string): Observable<void> {
    const id = this.afs.createId();
    return from(this.afs.doc<Group>(`restaurants/${restaurantId}/groups/${id}`).set({ id, ...group }));
  }

  editGroup(group: Group, restaurantId: string): Observable<void> {
    return from(this.afs.doc<Group>(`restaurants/${restaurantId}/groups/${group.id}`).update(group));
  }

  deleteGroup(id: string, restaurantId: string): Observable<void> {
    return from(this.afs.doc(`restaurants/${restaurantId}/groups/${id}`).delete());
  }

  addProduct(product: Product, restaurantId: string): Observable<void> {
    const id = this.afs.createId();
    return from(this.afs.doc<Product>(`restaurants/${restaurantId}/products/${id}`).set({ id, ...product }));
  }

  uploadImage(image: File, restaurantId: string): Observable<string> {
    const imageRef = this.afStorage.ref(`${restaurantId}/${image.name}`);
    return imageRef
      .put(image)
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => imageRef.getDownloadURL())
      );
  }

  editProduct(product: Product, restaurantId: string): Observable<void> {
    return from(this.afs.doc<Product>(`restaurants/${restaurantId}/products/${product.id}`).update(product));
  }

  deleteProduct(id: string, restaurantId: string): Observable<void> {
    return from(this.afs.doc(`restaurants/${restaurantId}/products/${id}`).delete());
  }

  deleteImage(imageUrl: string): Observable<void> {
    return from(this.afStorage.storage.refFromURL(imageUrl).delete());
  }
}
