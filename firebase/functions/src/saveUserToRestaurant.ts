import * as admin from "firebase-admin";

export function saveUser(id: string, userId: string): Promise<FirebaseFirestore.WriteResult> {
  return admin
    .firestore()
    .doc(`membersByRestaurants/${id}`)
    .set({ [userId]: true }, { merge: true });
}
