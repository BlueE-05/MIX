//* 1. Routes Products

import express from 'express';
import ProductHTTPHandler from '@/handlers/products';

const router = express.Router();
const productHandler = new ProductHTTPHandler();

router.get('/', productHandler.getProducts);

router.get('/:id', productHandler.getProductById);

router.get('/:name', productHandler.getProductByName);

router.post('/', productHandler.createProduct);

router.put('/:id', productHandler.updateProduct);

router.delete('/:id', productHandler.deleteProduct);

export default router;