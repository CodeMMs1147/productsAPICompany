import { Router } from 'express';
import * as productsController from '../controllers/products.controller';
import { authJwt } from '../middlewares';

const router = Router();

router.post('/', [authJwt.verifyToken, authJwt.moderator], productsController.createProduct);

router.get('/', productsController.getProducts);

router.get('/:productId', productsController.getProductById);

router.put('/:productId', [authJwt.verifyToken], productsController.updateProductById);

router.delete('/:productId', [authJwt.verifyToken, authJwt.moderator], productsController.deleteProductById);

export default router;
