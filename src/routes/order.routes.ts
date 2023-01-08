import { Router } from 'express';

import connection from '../models/connection';
import OrderModel from '../models/order.model';
import OrderService from '../services/order.service';
import OrderController from '../controllers/order.controller';

const orderModel = new OrderModel(connection);
const orderService = new OrderService(orderModel);
const orderController = new OrderController(orderService);

const router: Router = Router();

router.get('/', orderController.getAll);

export default router;
