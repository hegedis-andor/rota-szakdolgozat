import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { hashPassword } from "./hashing";
import { saveUser } from "./saveUserToRestaurant";

export const joinToRestaurantFn = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const restaurantName = request.body.name;
  const inputPassword = request.body.password;
  const userId: string = request.body.userId;

  const hashedInputPassword = hashPassword(inputPassword);

  try {
    const restaurantSnapshot = await getRestaurantCollectionSnapshot(restaurantName);
    if (!allCredentialsValid(restaurantSnapshot, hashedInputPassword)) {
      throw new Error("Incorrect password or restaurant name.");
    }

    const restaurantDocumentum = restaurantSnapshot.docs[0];
    const userDoc = await findMember(userId);
    if (userDoc.size === 0) {
      await saveUser(restaurantDocumentum.id, userId);
    }

    response.status(201).send(
      JSON.stringify({
        status: "success",
        data: {
          restaurant: {
            restaurantId: restaurantDocumentum.id,
            restaurantName: restaurantDocumentum.get("name")
          }
        }
      })
    );
  } catch (error) {
    response.status(403).send(JSON.stringify({ status: "fail", error: { message: error.message } }));
  }
});

function getRestaurantCollectionSnapshot(
  restaurantName: string
): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
  return admin
    .firestore()
    .collection("restaurants")
    .where("name", "==", restaurantName)
    .get();
}

function findMember(userId: string) {
  return admin
    .firestore()
    .collection("membersByRestaurants")
    .where(userId, "==", true)
    .get();
}

function allCredentialsValid(
  restaurantNameSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  hashedPassword: string
): boolean {
  if (restaurantNameSnapshot.empty) {
    return false;
  }

  const restaurantDocument = restaurantNameSnapshot.docs[0];
  if (hashedPassword !== restaurantDocument.get("password")) {
    return false;
  }

  return true;
}
