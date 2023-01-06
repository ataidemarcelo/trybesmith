import { Router } from 'express';

import connection from '../models/connection';
import UserModel from '../models/user.model';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';

const userModel = new UserModel(connection);
const userService = new UserService(userModel);
const userController = new UserController(userService);

const router: Router = Router();

router.post('/', userController.create);

export default router;
