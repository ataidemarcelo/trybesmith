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
    const product: ProductRequest = req.body;

    const productCreated = await this.service.create(product);
    
    res.status(statusCodes.CREATED).json(productCreated);
  };

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.service.getAll();
    res.status(statusCodes.OK).json(products);
  };
}

export default ProductController;