export interface Product {
  _id?: string;
  codigo: string;
  descrip: string;
  linea: string;
  marca: string;
  stock: number;
  venta1: number;
  venta2?: number;
  venta3?: number;
  venta4?: number;
  venta5?: number;
  venta6?: number;
  venta7?: number;
  venta8?: number;
  venta9?: number;
  venta10?: number;
  tags?: string[];
  rutaFoto?: string[];
}
