import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { UserRequest } from '../interfaces/user.interface';
import { jwtConfig, jwtSecret } from '../utils/jwt.config';

import UserService from '../services/user.service';
import statusCodes from '../utils/statusCodes';

class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  public create = async (req: Request, res: Response) => {
    try {
      const user: UserRequest = req.body;

      const userCreated = await this.service.create(user);

      if (!userCreated) {
        throw new Error('Error when trying to create user');
      }
      
      const token = sign(userCreated, jwtSecret.secret, jwtConfig);
      
      return res.status(statusCodes.CREATED).json({ token });
    } catch (err) {
      const { message } = err as Error;
      res.status(statusCodes.BAD_REQUEST).json({ message }); 
    }
  };
}

export default UserController;
