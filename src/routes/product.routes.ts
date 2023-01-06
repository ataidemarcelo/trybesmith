import { Router } from 'express';

import connection from '../models/connection';
import ProductModel from '../models/product.model';
import ProductService from '../services/product.service';
import ProductController from '../controllers/product.controller';

const productModel = new ProductModel(connection);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

const router: Router = Router();

router.post('/', productController.create);
router.get('/', productController.getAll);

export default router;
