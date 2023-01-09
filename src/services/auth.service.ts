import AuthModel from '../models/auth.model';
import { User, UserLogin } from '../interfaces/user.interface';

class UserService {
  private model: AuthModel;

  constructor(model: AuthModel) {
    this.model = model;
  }

  public async login({ username, password }: UserLogin): Promise<Omit<User, 'vocation' | 'level'>> {
    const user = await this.model.login({ username, password });
    return user;
  }
}

export default UserService;
