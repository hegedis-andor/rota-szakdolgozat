import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

interface Subgroup {
  id?: string;
  name: string;
}

export const onUpdateGroup = functions.firestore
  .document("resourcesByRestaurants/{restaurantId}/groups/{groupId}")
  .onUpdate(async (change, context) => {
    const db = admin.firestore();
    const restaurantId = context.params.restaurantId;

    const previousValue = change.before.data();
    const prevGroupName: string = previousValue ? previousValue.name : null;
    const prevSubgroups: Subgroup[] = previousValue ? previousValue.subgroups : null;

    const newValue = change.after.data();
    const newGroupName: string = newValue ? newValue.name : null;
    const newSubgroups: Subgroup[] = newValue ? newValue.subgroups : null;

    const updatePromises = [];

    if (prevGroupName !== newGroupName) {
      const updates = await updateGroupNameInProducts(db, restaurantId, prevGroupName, newGroupName);
      updatePromises.push(updates);
    }

    const modifiedSubgroups = getModifiedSubgroups(prevSubgroups, newSubgroups);
    if (modifiedSubgroups.length > 0) {
      const updates = await updateSubgroupInProducts(db, modifiedSubgroups, restaurantId);
      updatePromises.push(updates);
    }

    return Promise.all(updatePromises);
  });

async function updateGroupNameInProducts(
  db: FirebaseFirestore.Firestore,
  restaurantId: string,
  prevGroupName: string,
  newGroupName: string
) {
  const productWithGroupName = await db
    .collection(`resourcesByRestaurants/${restaurantId}/products`)
    .where("groupName", "==", prevGroupName)
    .get();

  const updates = productWithGroupName.docs.map(doc => {
    const updatedOrder = {
      ...doc.data(),
      groupName: newGroupName
    };
    return doc.ref.update(updatedOrder);
  });

  return updates;
}

async function updateSubgroupInProducts(
  db: FirebaseFirestore.Firestore,
  modifiedSubgroups: { prevName: string; newName: string; id: string }[],
  restaurantId: string
) {
  const updates = [];
  for (const subgroup of modifiedSubgroups) {
    const productWithSubgroupName = await db
      .collection(`resourcesByRestaurants/${restaurantId}/products`)
      .where("subgroup.id", "==", subgroup.id)
      .get();

    const updateProducts = productWithSubgroupName.docs.map(doc => {
      const updatedOrder = {
        ...doc.data(),
        subgroup: {
          id: subgroup.id,
          name: subgroup.newName
        }
      };

      return doc.ref.update(updatedOrder);
    });

    updates.push(updateProducts);
  }

  return updates;
}

function getModifiedSubgroups(
  prevSubgroups: Subgroup[],
  newSubgroups: Subgroup[]
): Array<{ prevName: string; newName: string; id: string }> {
  const modifiedSubgroups = new Array<{ prevName: string; newName: string; id: string }>();

  prevSubgroups.forEach(prevSubgroup => {
    const subgroup = newSubgroups.find(newSubgroup => prevSubgroup.id === newSubgroup.id);

    if (subgroup && subgroup?.name !== prevSubgroup.name) {
      modifiedSubgroups.push({
        prevName: prevSubgroup.name,
        newName: subgroup.name,
        id: subgroup.id ?? ""
      });
    }
  });

  return modifiedSubgroups;
}
