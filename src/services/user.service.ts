import UserModel from '../models/user.model';
import { User, UserRequest } from '../interfaces/user.interface';

class UserService {
  private model: UserModel;

  constructor(model: UserModel) {
    this.model = model;
  }

  public async create({ username, level, vocation, password }: UserRequest): Promise<User> {
    const newUser = await this.model.create({ username, level, vocation, password });
    delete newUser.password;
    return newUser;
  }
}

export default UserService;
