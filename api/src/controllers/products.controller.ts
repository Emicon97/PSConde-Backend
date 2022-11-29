import { NextFunction, Request, Response } from 'express';
import { CreateProductDto } from '@dtos/products.dto';
import { Product } from '@/interfaces/products.interface';
import ProductService from './../services/products.service';
import { RequestWithUser } from './../interfaces/auth.interface';

class ProductsController {
  public productService = new ProductService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: Array<Product | number> = await this.productService.findAllProduct(req.body);

      res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findBrands: string[] = await this.productService.findBrands();

      res.status(200).json({ data: findBrands, message: 'findBrands' });
    } catch (error) {
      next(error);
    }
  };

  public getProductsByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findProductsByNameData: Product[] = await this.productService.findProductsByName(req.body);

      res.status(200).json({ data: findProductsByNameData, message: 'findByName' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const findOneProductData: Product = await this.productService.findProductById(productId);

      res.status(200).json({ data: findOneProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: Product = await this.productService.createProduct(productData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const productData: CreateProductDto = req.body;
      const updateProductData: Product = await this.productService.updateProduct(productId, productData);

      res.status(200).json({ data: updateProductData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const deleteProductData: Product = await this.productService.deleteProduct(productId);

      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
