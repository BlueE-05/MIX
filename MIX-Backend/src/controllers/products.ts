//* 3. Controller Products

import ProductService from '@/db/products';

export default class ProductController {
    private service = ProductService;

    async getAllProducts() {
        return this.service.getAllProducts();
    }

    async getProductById(id: string) {
        return this.service.getProductById(id);
    }

    async getProductByName(name: string) {
        return this.service.getProductByName(name);
    }

    async getProductByEnterprise(enterprise: string) {
        return this.service.getProductByEnterprise(enterprise);
    }

    async createProduct(data: any[]) { //tal vez cambie any, pero creo que lo mas conveniente es que se quede así y los cambios se hagan solamente en db
        //aqui se podria reacomodar la data de ser necesario
        return this.service.createProduct(data);
    }

    async updateProduct(id: string, data: any[]) {
        //aca se puede reacomodar lo que recibe para que envie correctamente el array de datos al query
        return this.service.updateProduct(id, data);
    }

    async deleteProduct(id: string) {
        return this.service.deleteProduct(id);
    }
}