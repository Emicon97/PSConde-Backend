import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { Articulo } from './articulos.model';

@modelOptions({ schemaOptions: { collection: 'purchases' } })
export class Purchase {
  @prop({ required: true, ref: () => Articulo })
  public products: Ref<Articulo>[];
}

const PurchaseModel = getModelForClass(Purchase);

export default PurchaseModel;
