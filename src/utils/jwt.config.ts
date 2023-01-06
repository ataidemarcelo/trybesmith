import { SignOptions } from 'jsonwebtoken';

export const jwtSecret = {
  secret: 'SenhaVindaDasVariaveisDeAmbiente',
};

export const jwtConfig = {
  expiresIn: '15Min',
  algorithm: 'HS256',
} as SignOptions;
