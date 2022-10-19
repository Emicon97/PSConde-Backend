import { Type } from "@/enums/userTypes.enum";
import { Purchase } from './../models/purchases.model';
import { Cart } from "./cart.interface";

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  type: Type;
  listaP?: number;
  cart?: Cart[];
  history?: Purchase[];
}
