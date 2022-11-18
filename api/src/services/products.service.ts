import { CreateProductDto } from './../dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@/interfaces/products.interface';
import ArticuloModel from '@/models/articulos.model';
import { isEmpty } from '@utils/util';
import { Pagination } from '@/interfaces/pagination.interface';
import { Cart } from '@/interfaces/cart.interface';

class ProductService {
  public async findAllProduct({ limit, skip }: Pagination): Promise<Array<Product | Number>> {
    const products: Array<Product | Number> = await ArticuloModel.find({ stock: { $gte: 1 } })
      .limit(limit)
      .skip(skip);
    const amount: Number = await ArticuloModel.count({ stock: { $gte: 1 } });
    products.push(amount);

    return products;
  }

  public async findProductsByName(products: Cart[]): Promise<Product[]> {
    var findProducts: Promise<Product[]> = Promise.all(
      products.map(async item => {
        return await ArticuloModel.findOne({ descrip: item.title });
      }),
    );

    return findProducts;
  }

  public async findBrands(): Promise<string[]> {
    var brands = new Set<string>();
    const products: Product[] = await ArticuloModel.find();
    for (let product of products) {
      brands.add(product.marca);
    }
    const brandArray: string[] = Array.from(brands);

    return brandArray;
  }

  public async findProductById(productId: string): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, 'ProductId is empty');

    const findProduct: Product = await ArticuloModel.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'productData is empty');

    const createProductData: Product = await ArticuloModel.create(productData);

    return createProductData;
  }

  public async updateProduct(productId: string, productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'productData is empty');

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
