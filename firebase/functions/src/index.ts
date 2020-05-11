import * as admin from "firebase-admin";
import { createRestaurantFn } from "./createRestaurant";
import { joinToRestaurantFn } from "./joinRestaurant";
import { onUpdateGroup } from "./updateGroupTrigger";
import { onUpdateTable } from "./updateTableTrigger";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://ordering-app-fc78f.firebaseio.com"
});

export const createRestaurant = createRestaurantFn;
export const joinRestaurant = joinToRestaurantFn;
export const updateTableTrigger = onUpdateTable;
export const updateGroupTrigger = onUpdateGroup;
