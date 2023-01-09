import { Router } from 'express';
import Joi from 'joi';

import connection from '../models/connection';
import ProductModel from '../models/product.model';
import ProductService from '../services/product.service';
import ProductController from '../controllers/product.controller';
import statusCodes from '../utils/statusCodes';
import ValidationService from '../services/validation.service';

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const statusCodeObject = {
  'any.required': statusCodes.BAD_REQUEST,
  'string.base': statusCodes.UNPROCESSABLE_ENTITY,
  'string.min': statusCodes.UNPROCESSABLE_ENTITY,
};

const productModel = new ProductModel(connection);
const productService = new ProductService(productModel);
const validationService = new ValidationService(productSchema, statusCodeObject);
const productController = new ProductController(productService, validationService);

const router: Router = Router();

router.post('/', productController.create);
router.get('/', productController.getAll);

export default router;
