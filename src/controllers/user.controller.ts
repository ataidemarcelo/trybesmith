import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { UserRequest } from '../interfaces/user.interface';
import { jwtConfig, jwtSecret } from '../utils/jwt.config';

import UserService from '../services/user.service';
import statusCodes from '../utils/statusCodes';
import ValidationService from '../services/validation.service';
import ValidationError from '../errors/validation.error';

class UserController {
  private service: UserService;

  private validationService: ValidationService<UserRequest>;

  constructor(service: UserService, validationService: ValidationService<UserRequest>) {
    this.service = service;
    this.validationService = validationService;
  }

  public create = async (req: Request, res: Response) => {
    try {
      const { username, password, vocation, level }: UserRequest = req.body;
      this.validationService.validate({ username, password, vocation, level });

      const userCreated = await this.service.create({ username, password, vocation, level });

      if (!userCreated) {
        throw new Error('Error when trying to create user');
      }
      
      const token = sign(userCreated, jwtSecret.secret, jwtConfig);
      
      return res.status(statusCodes.CREATED).json({ token });
    } catch (err) {
      const { name, message, statusCode } = err as ValidationError;

      if (name === 'ValidationError') {
        return res.status(statusCode).json({ message });
      }
      res.status(statusCodes.BAD_REQUEST).json({ message }); 
    }
  };
}

export default UserController;
