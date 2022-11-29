import { CreateProductDto } from './../dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@/interfaces/products.interface';
import ArticuloModel from '@/models/articulos.model';
import { diacriticSensitiveRegex, isEmpty } from '@utils/util';
import { Pagination } from '@/interfaces/pagination.interface';
import { Cart } from '@/interfaces/cart.interface';
import { Or } from '@/interfaces/or.interface';

class ProductService {
  public async findAllProduct({ limit, skip, filters }: Pagination): Promise<Array<Product | number>> {
    const search: string = diacriticSensitiveRegex(filters.search).trim().replace(' ', '|');
    const category: string = filters.filters.category.join('|');
    const filter: string = filters.filters.filter.join('|');
    const brand: string = filters.filters.brand.join('|');

    const allFilterStrings: Array<string | Or> = [search, category, filter, brand];
    var allFilters: Or[] = [];

    allFilterStrings.forEach((element: string): void => {
      allFilters.push({
        $or: [
          { descrip: { $regex: element, $options: 'i' } },
          { linea: { $regex: element, $options: 'i' } },
          { tags: { $regex: element, $options: 'i' } },
          { marca: { $regex: element, $options: 'i' } },
        ],
      });
    });

    const filtered: Array<Product | number> = await ArticuloModel.find({
      stock: { $gte: 1 },
      $and: allFilters,
    })
      .limit(limit)
      .skip(skip);

    const amount: number = await ArticuloModel.count({
      stock: { $gte: 1 },
      $and: allFilters,
    });
    filtered.push(amount);

    return filtered;
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

    const updateProductById: Product = await ArticuloModel.findByIdAndUpdate(productId, productData);
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
