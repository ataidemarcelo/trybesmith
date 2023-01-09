import { Pool } from 'mysql2/promise';
import { User, UserLogin } from '../interfaces/user.interface';

export default class UserModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async login({ username, password }: UserLogin): Promise<User> {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.users WHERE username = ? AND password = ?',
      [username, password],
    );
    
    const [rows] = result;
    const [user] = rows as User[];
    return user;
  }
}