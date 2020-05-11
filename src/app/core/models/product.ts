import { Subgroup } from "./group";

export interface Product {
  id?: string;
  name: string;
  groupName: string;
  subgroup: Subgroup;
  ingredients?: string;
  allergens?: string;
  description?: string;
  preparationTime?: number;
  price: number;
  imagePath?: string;
  imageUrl?: string;
}
