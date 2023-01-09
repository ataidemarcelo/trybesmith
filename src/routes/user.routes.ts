import { Router } from 'express';
import Joi from 'joi';

import connection from '../models/connection';
import UserModel from '../models/user.model';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import statusCodes from '../utils/statusCodes';
import ValidationService from '../services/validation.service';

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  vocation: Joi.string().min(3).required(),
  level: Joi.number().integer().min(1).required(),
});

const statusCodeObject = {
  'any.required': statusCodes.BAD_REQUEST,
  'string.base': statusCodes.UNPROCESSABLE_ENTITY,
  'string.min': statusCodes.UNPROCESSABLE_ENTITY,
  'number.min': statusCodes.UNPROCESSABLE_ENTITY,
  'number.base': statusCodes.UNPROCESSABLE_ENTITY,
};

const userModel = new UserModel(connection);
const userService = new UserService(userModel);
const validationService = new ValidationService(userSchema, statusCodeObject);
const userController = new UserController(userService, validationService);

const router: Router = Router();

router.post('/', userController.create);

export default router;
