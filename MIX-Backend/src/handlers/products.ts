//* 2. Handler Products

import { Request, Response, NextFunction } from 'express';
import ProductController from '@/controllers/products';

export default class ProductHTTPHandler {
    private productController: ProductController;

    constructor() {
        this.productController = new ProductController();
    }

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productController.getAllProducts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await this.productController.getProductById(req.params.id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async getProductByName(req: Request, res: Response, next: NextFunction) {
        try {
            const product = this.productController.getProductByName(req.params.name);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const newProduct = await this.productController.createProduct(req.body);
            res.json(newProduct);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await this.productController.updateProduct(req.params.id, req.body);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            await this.productController.deleteProduct(req.params.id);
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}