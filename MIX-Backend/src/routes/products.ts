import express from 'express';
<<<<<<< Updated upstream
import ProductHandler from '@/handlers/products';

const router = express.Router();
const productHandler = new ProductHandler();

router.get('/', productHandler.getProducts);
router.get('/id/:id', productHandler.getProductById);
router.get('/name/:name', productHandler.getProductByName);

router.post('/', productHandler.createProduct);
router.put('/:id', productHandler.updateProduct);
router.delete('/:id', productHandler.deleteProduct);
=======
import ProductHTTPHandler from '@/handlers/products';

const router = express.Router();
const productHandler = new ProductHTTPHandler();

router.get('/', productHandler.getProducts);

router.get('/:id', productHandler.getProductById);

router.post('/:id', productHandler.createContact);

router.put('/:id', productHandler.updateProduct);

router.delete(':id', productHandler.deleteProduct);

router.get('/', productHandler.productById);

router.get('/', productHandler.productByName);

>>>>>>> Stashed changes

export default router;