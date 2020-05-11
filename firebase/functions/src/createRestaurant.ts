import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { hashPassword } from "./hashing";
import { saveUser } from "./saveUserToRestaurant";

interface Restaurant {
  restaurantId: string;
  name: string;
  password: string;
  creator: string;
}

export const createRestaurantFn = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const restaurantName = request.body.name;
  const restaurantPassword = request.body.password;
  const creatorUid = request.body.creator;

  const hashedRestaurantPassword = hashPassword(restaurantPassword);

  try {
    const restaurantSnapshot = await getRestaurantSnapshotByName(restaurantName);
    if (!restaurantSnapshot.empty) {
      throw new Error("Restaurant name is taken.");
    }

    const restaurantDocumentRef = getNewDocumentRefForRestaurant();
    const docId = restaurantDocumentRef.id;

    const restaurant = {
      restaurantId: docId,
      name: restaurantName,
      password: hashedRestaurantPassword,
      creator: creatorUid,
    };

    try {
      await addRestaurant(restaurantDocumentRef, restaurant);
    } catch (error) {
      throw Error("Could not create the restaurant.");
    }

    try {
      await saveUser(docId, creatorUid);
    } catch (error) {
      console.log(error);
      throw Error("Could not save user.");
    }

    response.status(201).send(
      JSON.stringify({
        status: "success",
        data: {
          restaurant: {
            restaurantId: docId,
            restaurantName: restaurantName,
          },
        },
      })
    );
  } catch (error) {
    response.status(500).send(JSON.stringify({ status: "fail", error: { message: error.message } }));
  }
});

function getRestaurantSnapshotByName(restaurantName: string): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
  return admin.firestore().collection("restaurants").where("name", "==", restaurantName).get();
}

function getNewDocumentRefForRestaurant(): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> {
  return admin.firestore().collection("restaurants").doc();
}

function addRestaurant(docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>, restaurant: Restaurant) {
  return docRef.set(restaurant);
}
