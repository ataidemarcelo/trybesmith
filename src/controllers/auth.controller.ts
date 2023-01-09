import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { UserLogin } from '../interfaces/user.interface';
import { jwtConfig, jwtSecret } from '../utils/jwt.config';

import AuthService from '../services/auth.service';
import ValidationService from '../services/validation.service';
import statusCodes from '../utils/statusCodes';
import ValidationError from '../errors/validation.error';

class UserController {
  private service: AuthService;

  private validationService: ValidationService<UserLogin>;

  constructor(service: AuthService, validationService: ValidationService<UserLogin>) {
    this.service = service;
    this.validationService = validationService;
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { username, password }: UserLogin = req.body;
      this.validationService.validate({ username, password });

      const user = await this.service.login({ username, password });
      if (!user) {
        throw new Error('Username or password invalid');
      }
      
      const { username: name, id: userId } = user;
      
      const token = sign({ name, userId }, jwtSecret.secret, jwtConfig);
      
      return res.status(statusCodes.OK).json({ token });
    } catch (err) {
      const { name, message, statusCode } = err as ValidationError;
      
      if (name === 'ValidationError') {
        return res.status(statusCode).json({ message });
      }
      res.status(statusCodes.UNAUTHORIZED).json({ message }); 
    }
  };
}

export default UserController;
