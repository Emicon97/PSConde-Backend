import { Router } from 'express';
import ProductsController from './../controllers/products.controller';
import { Routes } from '@interfaces/routes.interface';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productsController.getProducts);
    this.router.get(`${this.path}/:id`, this.productsController.getProductById);
    this.router.post(`${this.path}`, this.productsController.createProduct);
    this.router.put(`${this.path}/:id`, this.productsController.updateProduct);
    this.router.delete(`${this.path}/:id`, this.productsController.deleteProduct);
  }
}

export default ProductsRoute;
