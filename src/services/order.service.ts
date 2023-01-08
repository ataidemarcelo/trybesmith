import OrderModel from '../models/order.model';
import { Order } from '../interfaces/order.interface';

class OrderService {
  private model: OrderModel;

  constructor(model: OrderModel) {
    this.model = model;
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }
}

export default OrderService;
