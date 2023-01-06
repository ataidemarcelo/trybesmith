import ProductModel from '../models/product.model';
import { Product, ProductRequest } from '../interfaces/product.interface';

class ProductService {
  private model: ProductModel;

  constructor(model: ProductModel) {
    this.model = model;
  }

  public async create(product: ProductRequest): Promise<Product> {
    return this.model.create(product);
  }
}

export default ProductService;
