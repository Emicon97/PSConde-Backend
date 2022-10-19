import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'products' } })
export class Articulo {
  @prop({ type: String, required: true, unique: true })
  public codigo: string;

  @prop({ type: String, required: true })
  public descrip: string;

  @prop({ type: String, required: true })
  public linea: string;

  @prop({ type: String, required: true })
  public marca: string;

  @prop({ type: String })
  public tags: string[];

  @prop({ type: Number })
  public venta1: number;

  @prop({ type: Number })
  public venta2: number;

  @prop({ type: Number })
  public venta3: number;

  @prop({ type: Number })
  public venta4: number;

  @prop({ type: Number })
  public venta5: number;

  @prop({ type: Number })
  public venta6: number;

  @prop({ type: Number })
  public venta7: number;

  @prop({ type: Number })
  public venta8: number;

  @prop({ type: Number })
  public venta9: number;

  @prop({ type: Number })
  public venta10: number;

  @prop({ type: String })
  public rutaFoto: string[];

  @prop({ type: Number, default: 0 })
  public stock: number;
}

const ArticuloModel = getModelForClass(Articulo);

export default ArticuloModel;
