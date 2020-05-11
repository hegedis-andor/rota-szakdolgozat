import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onUpdateTable = functions.firestore
  .document("resourcesByRestaurants/{restaurantId}/tables/{tableId}")
  .onUpdate(async (change, context) => {
    const db = admin.firestore();

    const previousValue = change.before.data();
    const oldName = previousValue ? previousValue.name : null;
    const newValue = change.after.data();
    const newName = newValue ? newValue.name : null;

    if (newName === oldName) {
      return new Promise(() => "Name is not changed.");
    }

    const restaurantId = context.params.restaurantId;
    const activeOrdersSnapshot = await db
      .collection(`ordersByRestaurants/${restaurantId}/orders`)
      .where("status", "==", "active")
      .where("tableName", "==", oldName)
      .get();

    const updateOrders = activeOrdersSnapshot.docs.map(doc => {
      const updatedOrder = {
        ...doc.data(),
        tableName: newName
      };
      return doc.ref.update(updatedOrder);
    });

    return Promise.all(updateOrders);
  });
