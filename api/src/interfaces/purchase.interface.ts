import { Product } from './products.interface';

export interface Purchase {
  _id?: string;
  products: Product[];
}
