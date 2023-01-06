export interface UserRequest {
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export interface User {
  id: number;
  username: string;
  vocation: string;
  level: number;
  password?: string;
}
