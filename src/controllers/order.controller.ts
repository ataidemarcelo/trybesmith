import { Request, Response } from 'express';

import { Order } from '../interfaces/order.interface';

import OrderService from '../services/order.service';
import statusCodes from '../utils/statusCodes';

class OrderController {
  private service: OrderService;

  constructor(service: OrderService) {
    this.service = service;
  }

  public getAll = async (_req: Request, res: Response) => {
    try {
      const orders: Order[] = await this.service.getAll();

      if (!orders) {
        throw new Error('Error when trying to read Orders');
      }
      
      return res.status(statusCodes.OK).json(orders);
    } catch (err) {
      const { message } = err as Error;
      res.status(statusCodes.BAD_REQUEST).json({ message }); 
    }
  };
}

export default OrderController;
