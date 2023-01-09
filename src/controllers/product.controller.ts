import { Request, Response } from 'express';
import ValidationError from '../errors/validation.error';
import { ProductRequest } from '../interfaces/product.interface';

import ProductService from '../services/product.service';
import ValidationService from '../services/validation.service';
import statusCodes from '../utils/statusCodes';

class ProductController {
  private service: ProductService;

  private validationService: ValidationService<ProductRequest>;

  constructor(service: ProductService, validationService: ValidationService<ProductRequest>) {
    this.service = service;
    this.validationService = validationService;
  }

  public create = async (req: Request, res: Response) => {
    try {
      const { amount, name }: ProductRequest = req.body;
      this.validationService.validate({ amount, name });

      const productCreated = await this.service.create({ amount, name });

      if (!productCreated) {
        throw new Error('Error when trying to register product');
      }
    
      res.status(statusCodes.CREATED).json(productCreated);
    } catch (err) {
      const { name, message, statusCode } = err as ValidationError;
      if (name === 'ValidationError') {
        return res.status(statusCode).json({ message });
      }
      res.status(statusCodes.BAD_REQUEST).json({ message }); 
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    try {
      const products = await this.service.getAll();

      if (!products) {
        throw new Error('Error when trying to read products');
      }

      res.status(statusCodes.OK).json(products);
    } catch (err) {
      const { message } = err as Error;
      res.status(statusCodes.BAD_REQUEST).json({ message }); 
    }
  };
}

export default ProductController;
