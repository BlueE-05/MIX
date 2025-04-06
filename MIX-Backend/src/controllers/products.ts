//* 3. Controller Products

import ProductService from '@/db/products';

export default class ProductController {
    private service = new ProductService;

    async getAllProducts() {
        return this.service.getAllProducts();
    }

    async getProductById(id: string) {
        return this.service.getProductById(id);
    }

    async getProductByName(name: string) {
        return this.service.getProductByName(name);
    }

    async createProduct(data: { id: string; name: string; description: string; type: boolean; price: number; commission: number }) {
        return this.service.createProduct(data);
    }

    async updateProduct(id: string, data: { name: string; description: string; type: boolean; price: number; commission: number }) {
        return this.service.updateProduct(id, data);
    }

    async deleteProduct(id: string) {
        return this.service.deleteProduct(id);
    }
}