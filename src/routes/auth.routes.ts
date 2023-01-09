import { Router } from 'express';
import Joi from 'joi';

import connection from '../models/connection';
import AuthModel from '../models/auth.model';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import ValidationService from '../services/validation.service';
import statusCodes from '../utils/statusCodes';

const userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const statusCodeObject = {
  'any.required': statusCodes.BAD_REQUEST,
};

const authModel = new AuthModel(connection);
const authService = new AuthService(authModel);
const validationService = new ValidationService(userLoginSchema, statusCodeObject);
const authController = new AuthController(authService, validationService);

const router: Router = Router();

router.post('/', authController.login);

export default router;
