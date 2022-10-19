import { CreateProductDto } from './../dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@/interfaces/products.interface';
import ArticuloModel from '@/models/articulos.model';
import { isEmpty } from '@utils/util';

class ProductService {
  public async findAllProduct(): Promise<Product[]> {
    const products: Product[] = await ArticuloModel.find();
    return products;
  }

  public async findProductById(productId: string): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, "ProductId is empty");

    const findProduct: Product = await ArticuloModel.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "productData is empty");

    const createProductData: Product = await ArticuloModel.create(productData);

    return createProductData;
  }

  public async updateProduct(productId: string, productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "productData is empty");

    const updateProductById: Product = await ArticuloModel.findByIdAndUpdate(productId, { productData });
    if (!updateProductById) throw new HttpException(409, "Product doesn't exist");

    return updateProductById;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProductById: Product = await ArticuloModel.findByIdAndDelete(productId);
    if (!deleteProductById) throw new HttpException(409, "User doesn't exist");

    return deleteProductById;
  }
}

export default ProductService;
