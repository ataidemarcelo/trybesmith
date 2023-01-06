import { Request, Response } from 'express';
import { ProductRequest } from '../interfaces/product.interface';

import ProductService from '../services/product.service';
import statusCodes from '../utils/statusCodes';

class ProductController {
  private service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  public create = async (req: Request, res: Response) => {
    try {
      const product: ProductRequest = req.body;

      const productCreated = await this.service.create(product);

      if (!productCreated) {
        throw new Error('Error when trying to register product');
      }
    
      res.status(statusCodes.CREATED).json(productCreated);
    } catch (err) {
      const { message } = err as Error;
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
